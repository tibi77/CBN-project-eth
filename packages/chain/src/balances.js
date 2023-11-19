var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RuntimeModule, runtimeMethod, runtimeModule, state, } from "@proto-kit/module";
import { StateMap } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";
import { assert } from "@proto-kit/protocol";
export const errors = {
    underflow: "Cannot subtract, the result would underflow",
    overflow: "Cannot add, the result would overflow",
};
export function safeSub(a, b, error = errors.underflow) {
    const fieldSub = a.value.sub(b.value);
    const fieldSubTruncated = fieldSub.rangeCheckHelper(UInt64.NUM_BITS);
    const doesNotUnderflow = fieldSubTruncated.equals(fieldSub);
    assert(doesNotUnderflow, error);
    return new UInt64(fieldSubTruncated);
}
export function safeAdd(a, b, error = errors.overflow) {
    const fieldAdd = a.value.add(b.value);
    const fieldAddTruncated = fieldAdd.rangeCheckHelper(UInt64.NUM_BITS);
    const doesNotOverflow = fieldAddTruncated.equals(fieldAdd);
    assert(doesNotOverflow, error);
    return new UInt64(fieldAddTruncated);
}
let Balances = class Balances extends RuntimeModule {
    constructor() {
        super(...arguments);
        this.balances = StateMap.from(PublicKey, UInt64);
    }
    add(to, amount) {
        const balance = this.balances.get(to);
        const newBalance = safeAdd(balance.value, amount);
        this.balances.set(to, newBalance);
    }
    subtract(from, amount) {
        const balance = this.balances.get(from);
        const newBalance = safeSub(balance.value, amount);
        this.balances.set(from, newBalance);
    }
};
__decorate([
    state(),
    __metadata("design:type", Object)
], Balances.prototype, "balances", void 0);
__decorate([
    runtimeMethod(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, UInt64]),
    __metadata("design:returntype", void 0)
], Balances.prototype, "add", null);
__decorate([
    runtimeMethod(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, UInt64]),
    __metadata("design:returntype", void 0)
], Balances.prototype, "subtract", null);
Balances = __decorate([
    runtimeModule()
], Balances);
export { Balances };
