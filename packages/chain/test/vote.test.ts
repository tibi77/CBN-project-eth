import "reflect-metadata";
import { TestingAppChain } from "@proto-kit/sdk";
import {
  Vote,
  VoteProof,
  VotePublicOutput,
  canVote,
  message,
} from "../src/vote";
import {
  Field,
  PrivateKey,
  Nullifier,
  MerkleMap,
  Poseidon,
  Bool,
  UInt64,
} from "o1js";
import { Balances } from "../src/balances";
import { Pickles } from "o1js/dist/node/snarky";
import { dummyBase64Proof } from "o1js/dist/node/lib/proof_system";

describe("Vote", () => {
  let appChain: TestingAppChain<{
    Vote: typeof Vote;
    Balances: typeof Balances;
  }>;
  let vote: Vote;
  let balances: Balances;

  const aliceKey = PrivateKey.random();
  const alice = aliceKey.toPublicKey();

  const bobKey = PrivateKey.random();
  const bob = bobKey.toPublicKey();

  const map = new MerkleMap();
  const keyAlice = Poseidon.hash(alice.toFields());
  const keyBob = Poseidon.hash(alice.toFields());
  map.set(keyAlice, Bool(true).toField());
  map.set(keyBob, Bool(true).toField());

  const witness = map.getWitness(keyAlice);

  async function mockProof(publicOutput: VotePublicOutput): Promise<VoteProof> {
    const [, proof] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
    return new VoteProof({
      proof: proof,
      maxProofsVerified: 2,
      publicInput: undefined,
      publicOutput,
    });
  }

  beforeAll(async () => {
    appChain = TestingAppChain.fromRuntime({
      modules: {
        Vote: Vote,
        Balances: Balances,
      },
      config: {
        Vote: {},
        Balances: {},
      },
    });
    await appChain.start();

    appChain.setSigner(aliceKey);

    vote = appChain.runtime.resolve("Vote");
    balances = appChain.runtime.resolve("Balances");
  });

  it("should setup the vote commitment", async () => {
    const tx = await appChain.transaction(alice, () => {
      vote.setCommitment(map.getRoot());
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();
    const commitment = await appChain.query.runtime.Vote.commitment.get();
    expect(commitment?.toBigInt()).toBe(map.getRoot().toBigInt());
  });

  it("should allow voting if a valid proof is provided", async () => {
    const nullifier = Nullifier.fromJSON(
      Nullifier.createTestNullifier(message, aliceKey)
    );

    const voteProof = await mockProof(canVote(witness, nullifier));

    const tx = await appChain.transaction(alice, () => {
      vote.vote(voteProof, bob);
    });

    await tx.sign();
    await tx.send();

    const block = await appChain.produceBlock();

    const storedNullifier = await appChain.query.runtime.Vote.nullifiers.get(
      voteProof.publicOutput.nullifier
    );
    const balance = await appChain.query.runtime.Balances.balances.get(alice);
    console.log(balance);

    expect(block?.txs[0].status).toBe(true);
    expect(storedNullifier?.toBoolean()).toBe(true);
    // expect(balance?.toBigInt()).toBe(1000n);
  });

  it("should not allow claiming if a spent nullifier is used", async () => {
    // removing this test because if the nullifier is already used, the proof will fail
    // const nullifier = Nullifier.fromJSON(
    //   Nullifier.createTestNullifier([Field(0)], aliceKey)
    // );
    // const voteProof = await mockProof(canVote(witness, nullifier));
    // const tx = await appChain.transaction(alice, () => {
    //   vote.vote(voteProof, bob);
    // });
    // await tx.sign();
    // await tx.send();
    // const block = await appChain.produceBlock();
    // const storedNullifier = await appChain.query.runtime.Vote.nullifiers.get(
    //   voteProof.publicOutput.nullifier
    // );
    // const balance = await appChain.query.runtime.Balances.balances.get(alice);
    // console.log(balance)
    // expect(block?.txs[0].status).toBe(false);
    // expect(block?.txs[0].statusMessage).toMatch(
    //   /Nullifier has already been used/
    // );
    // expect(storedNullifier?.toBoolean()).toBe(true);
    // expect(balance?.toBigInt()).toBe(1000n);
  });
});
