import { RuntimeModule } from "@proto-kit/module";
import { StateMap } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";
export declare const errors: {
    underflow: string;
    overflow: string;
};
export declare function safeSub(a: UInt64, b: UInt64, error?: string): UInt64;
export declare function safeAdd(a: UInt64, b: UInt64, error?: string): UInt64;
export declare class Balances extends RuntimeModule<unknown> {
    balances: StateMap<PublicKey, UInt64>;
    add(to: PublicKey, amount: UInt64): void;
    subtract(from: PublicKey, amount: UInt64): void;
}
//# sourceMappingURL=balances.d.ts.map