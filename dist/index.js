"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dnsVerifier_1 = __importDefault(require("./services/dnsVerifier"));
const emailVerifier_1 = __importDefault(require("./services/emailVerifier"));
class DnsEmailValidation {
    async verify(email, options) {
        try {
            if ((0, emailVerifier_1.default)(email) === false)
                return { verification: false, reason: ['BAD_EMAIL'] };
            return (0, dnsVerifier_1.default)(email, options || { MX: true });
        }
        catch (e) {
            console.error('DnsEmailValidation::', e);
            return { verification: false, reason: ['UNKNOWN'] };
        }
    }
}
exports.default = new DnsEmailValidation();
