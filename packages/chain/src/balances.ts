import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { StateMap } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";
import { assert } from "@proto-kit/protocol";

export const errors = {
  underflow: "Cannot subtract, the result would underflow",
  overflow: "Cannot add, the result would overflow",
};

export function safeSub(
  a: UInt64,
  b: UInt64,
  error: string = errors.underflow
) {
  const fieldSub = a.value.sub(b.value);
  const fieldSubTruncated = fieldSub.rangeCheckHelper(UInt64.NUM_BITS);
  const doesNotUnderflow = fieldSubTruncated.equals(fieldSub);

  assert(doesNotUnderflow, error);

  return new UInt64(fieldSubTruncated);
}

export function safeAdd(a: UInt64, b: UInt64, error = errors.overflow) {
  const fieldAdd = a.value.add(b.value);
  const fieldAddTruncated = fieldAdd.rangeCheckHelper(UInt64.NUM_BITS);
  const doesNotOverflow = fieldAddTruncated.equals(fieldAdd);

  assert(doesNotOverflow, error);

  return new UInt64(fieldAddTruncated);
}
@runtimeModule()
export class Balances extends RuntimeModule<unknown> {
  @state() public balances = StateMap.from<PublicKey, UInt64>(
    PublicKey,
    UInt64
  );

  @runtimeMethod()
  public add(to: PublicKey, amount: UInt64) {
    const balance = this.balances.get(to);
    const newBalance = safeAdd(balance.value, amount);
    this.balances.set(to, newBalance);
  }
  @runtimeMethod()
  public subtract(from: PublicKey, amount: UInt64) {
    const balance = this.balances.get(from);
    const newBalance = safeSub(balance.value, amount);
    this.balances.set(from, newBalance);
  }
}
