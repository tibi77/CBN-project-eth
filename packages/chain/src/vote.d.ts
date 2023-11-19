import { RuntimeModule } from "@proto-kit/module";
import { State, StateMap } from "@proto-kit/protocol";
import { Field, MerkleMapWitness, Nullifier, PublicKey } from "o1js";
import { Balances } from "./balances";
declare const VotePublicOutput_base: (new (value: {
    root: import("o1js/dist/node/lib/field").Field;
    nullifier: import("o1js/dist/node/lib/field").Field;
}) => {
    root: import("o1js/dist/node/lib/field").Field;
    nullifier: import("o1js/dist/node/lib/field").Field;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    root: import("o1js/dist/node/lib/field").Field;
    nullifier: import("o1js/dist/node/lib/field").Field;
}> & {
    toInput: (x: {
        root: import("o1js/dist/node/lib/field").Field;
        nullifier: import("o1js/dist/node/lib/field").Field;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        root: import("o1js/dist/node/lib/field").Field;
        nullifier: import("o1js/dist/node/lib/field").Field;
    }) => {
        root: string;
        nullifier: string;
    };
    fromJSON: (x: {
        root: string;
        nullifier: string;
    }) => {
        root: import("o1js/dist/node/lib/field").Field;
        nullifier: import("o1js/dist/node/lib/field").Field;
    };
};
export declare class VotePublicOutput extends VotePublicOutput_base {
}
export declare const message: Field[];
export declare function canVote(witness: MerkleMapWitness, nullifier: Nullifier): VotePublicOutput;
export declare const voteZK: {
    name: string;
    compile: () => Promise<{
        verificationKey: string;
    }>;
    verify: (proof: import("o1js/dist/node/lib/proof_system").Proof<undefined, VotePublicOutput>) => Promise<boolean>;
    digest: () => string;
    analyzeMethods: () => {
        rows: number;
        digest: string;
        result: unknown;
        gates: import("o1js/dist/node/snarky").Gate[];
        publicInputSize: number;
    }[];
    publicInputType: import("o1js/dist/node/lib/circuit_value").ProvablePureExtended<undefined, null>;
    publicOutputType: typeof VotePublicOutput;
} & {
    canVote: (...args: [MerkleMapWitness, Nullifier] & any[]) => Promise<import("o1js/dist/node/lib/proof_system").Proof<undefined, VotePublicOutput>>;
};
declare const VoteProof_base: {
    new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
        proof: unknown;
        publicInput: undefined;
        publicOutput: VotePublicOutput;
        maxProofsVerified: 0 | 2 | 1;
    }): {
        publicInput: undefined;
        publicOutput: VotePublicOutput;
        proof: unknown;
        maxProofsVerified: 0 | 2 | 1;
        shouldVerify: import("o1js/dist/node/lib/bool").Bool;
        verify(): void;
        verifyIf(condition: import("o1js/dist/node/lib/bool").Bool): void;
        toJSON(): import("o1js/dist/node/lib/proof_system").JsonProof;
    };
    publicInputType: import("o1js/dist/node/lib/circuit_value").ProvablePureExtended<undefined, null>;
    publicOutputType: typeof VotePublicOutput;
    tag: () => {
        name: string;
        publicInputType: import("o1js/dist/node/lib/circuit_value").ProvablePureExtended<undefined, null>;
        publicOutputType: typeof VotePublicOutput;
    };
    fromJSON<S extends (new (...args: any) => import("o1js/dist/node/lib/proof_system").Proof<unknown, unknown>) & {
        prototype: import("o1js/dist/node/lib/proof_system").Proof<any, any>;
        publicInputType: import("o1js/dist/node/lib/circuit_value").FlexibleProvablePure<any>;
        publicOutputType: import("o1js/dist/node/lib/circuit_value").FlexibleProvablePure<any>;
        tag: () => {
            name: string;
        };
        fromJSON: typeof import("o1js/dist/node/lib/proof_system").Proof.fromJSON;
    } & {
        prototype: import("o1js/dist/node/lib/proof_system").Proof<unknown, unknown>;
    }>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js/dist/node/lib/proof_system").JsonProof): import("o1js/dist/node/lib/proof_system").Proof<import("o1js/dist/node/bindings/lib/provable-snarky").InferProvable<S["publicInputType"]>, import("o1js/dist/node/bindings/lib/provable-snarky").InferProvable<S["publicOutputType"]>>;
};
export declare class VoteProof extends VoteProof_base {
}
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
export declare class Vote extends RuntimeModule<VoteConfig> {
    balances: Balances;
    commitment: State<import("o1js/dist/node/lib/field").Field>;
    nullifiers: StateMap<import("o1js/dist/node/lib/field").Field, import("o1js/dist/node/lib/bool").Bool>;
    constructor(balances: Balances);
    setCommitment(commitment: Field): void;
    vote(voteProof: VoteProof, receiverAddress: PublicKey): void;
}
export {};
/**
 * Votes tally can not be spent, but they are used to determine how good is a specific author
 * CountVote is the number of votes that a user can cast
 */
//# sourceMappingURL=vote.d.ts.map