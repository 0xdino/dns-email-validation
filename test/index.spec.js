"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
describe('DnsEmailValidation', () => {
    it('Checking an incorrectly specified email address', async () => {
        expect(await src_1.default.verify('bad@email')).toEqual({
            verification: false,
            reason: ['BAD_EMAIL'],
        });
    });
    it('Checking email address with the incorrect MX record', async () => {
        expect(await src_1.default.verify('bad@example.com', {
            MX: true,
            NS: true,
            A: true,
        })).toEqual({ verification: false, reason: ['MX'] });
    });
    it('Verifying the correct email address', async () => {
        expect(await src_1.default.verify('email@gmail.com', {
            MX: true,
            NS: true,
            A: true,
        })).toEqual({
            verification: true,
        });
    });
    it('Verifying the bad domain', async () => {
        expect(await src_1.default.verify('admin@local.local')).toEqual({
            verification: false,
            reason: ['ENOTFOUND'],
        });
    });
});
