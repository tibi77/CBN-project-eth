import {
  RuntimeModule,
  runtimeMethod,
  state,
  runtimeModule,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import {
  Bool,
  Experimental,
  Field,
  MerkleMapWitness,
  Nullifier,
  Poseidon,
  PublicKey,
  Struct,
  UInt64,
} from "o1js";
import { inject } from "tsyringe";
import { Balances } from "./balances";

const BALLOT_SIZE = UInt64.from(100);

export class VotePublicOutput extends Struct({
  root: Field,
  nullifier: Field,
}) {}

export const message: Field[] = [Field(7)];

export function canVote(
  witness: MerkleMapWitness,
  nullifier: Nullifier
): VotePublicOutput {
  const key = Poseidon.hash(nullifier.getPublicKey().toFields());
  const [computedRoot, computedKey] = witness.computeRootAndKey(
    Bool(true).toField()
  );
  computedKey.assertEquals(key);

  nullifier.verify(message);

  return new VotePublicOutput({
    root: computedRoot,
    nullifier: nullifier.key(),
  });
}

export const voteZK = Experimental.ZkProgram({
  publicOutput: VotePublicOutput,
  methods: {
    canVote: {
      privateInputs: [MerkleMapWitness, Nullifier],
      method: canVote,
    },
  },
});

export class VoteProof extends Experimental.ZkProgram.Proof(voteZK) {}

type VoteConfig = Record<string, never>;

/**
 * Voting for what they want
 * 1.         we get a list of world id to mina wallet -> we can do this further when mina implements the link with the eth ids
 * 2. user logs in, they have this 2 ids for each
 * 3. user create articles
 * 4. when i want to vote i create a nullifier for the article, thus casting the vote
 * 5. when x wants to know that they have more or less than a specific number of votes, we count the votes
 * 6. when nullifier created you can not cast votes anymore
 */

@runtimeModule()
export class Vote extends RuntimeModule<VoteConfig> {
  @state() public commitment = State.from<Field>(Field);
  @state() public nullifiers = StateMap.from<Field, Bool>(Field, Bool);

  public constructor(@inject("Balances") public balances: Balances) {
    super();
  }

  @runtimeMethod()
  public setCommitment(commitment: Field) {
    this.commitment.set(commitment);
  }

  @runtimeMethod()
  public vote(voteProof: VoteProof, receiverAddress: PublicKey) {
    voteProof.verify();
    const commitment = this.commitment.get();
    assert(
      voteProof.publicOutput.root.equals(commitment.value),
      "Airdrop proof does not contain the correct commitment"
    );

    const isNullifierUsed = this.nullifiers.get(
      voteProof.publicOutput.nullifier
    );

    assert(isNullifierUsed.value.not(), "Nullifier has already been used");

    this.nullifiers.set(voteProof.publicOutput.nullifier, Bool(true));

    // this.balances.subtract(this.transaction.sender, BALLOT_SIZE);
    // uncomment when tests are passing
    this.balances.add(receiverAddress, BALLOT_SIZE);
  }
}

// @runtimeModule()
// export class Votes extends RuntimeModule<unknown> {
// idea: remove the link between can cast vote and votes tally
/**
 * Votes tally can not be spent, but they are used to determine how good is a specific author
 * CountVote is the number of votes that a user can cast
 */

// Votes shall be understood as voting power in the sense that you spend a token for up and down vote
// casting is both up and down vote
//   @state() public votesTally = StateMap.from<PublicKey, UInt64>(
//     PublicKey,
//     UInt64
//   );
//   @state() public countVote = StateMap.from<PublicKey, UInt64>(
//     PublicKey,
//     UInt64
//   );
//   @state() public nullifier = StateMap.from<PublicKey, Bool>(PublicKey, Bool);

//   // Upvote; one cast
//   // Direction is true fo upvote and false for downvote
//   @runtimeMethod()
//   public upVote(from: PublicKey, to: PublicKey, direction: Bool): void {
//     const fromNumVotes = this.countVote.get(from);
//     const toNumVotes = this.votesTally.get(to);
//     const isFromVotesSufficient = fromNumVotes.value.greaterThanOrEqual(
//       UInt64.from(1)
//     );
//     // const isNullifierSet = this.nullifier.get(from).value;
//     // assert(isNullifierSet, "You already voted for this post");
//     assert(isFromVotesSufficient, "Not enough votes to cast");
//     // unsure about this direction :( ... write a test
//     const numberOfVotesWriter = toNumVotes.value.add(
//       UInt64.from(1 * (direction ? 1 : -1))
//     );
//     const numberOfVotesVoter = fromNumVotes.value.sub(UInt64.from(1));
//     this.votesTally.set(to, numberOfVotesWriter);
//     this.countVote.set(from, numberOfVotesVoter);
//     this.nullifier.set(from, Bool(true));
//   }
// }
