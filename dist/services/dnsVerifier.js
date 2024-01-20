"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_dns_1 = require("node:dns");
const node_util_1 = require("node:util");
const resolveAsync = (0, node_util_1.promisify)(node_dns_1.resolve);
async function dnsVerifier(email, options) {
    try {
        const _email = email.split('@')[1];
        let MX = false;
        let NS = false;
        let A = false;
        for (const record of await resolveAsync(_email, 'MX')) {
            if (record.exchange.length > 0)
                MX = true;
        }
        for (const record of await resolveAsync(_email, 'NS')) {
            if (record.length > 0)
                NS = true;
        }
        for (const record of await resolveAsync(_email, 'A')) {
            if (record.length > 0)
                A = true;
        }
        const reason = [];
        if (options.MX === true) {
            !MX && reason.push('MX');
        }
        if (options.NS === true) {
            !NS && reason.push('NS');
        }
        if (options.A === true) {
            !A && reason.push('A');
        }
        return reason.length === 0
            ? { verification: true }
            : { verification: false, reason };
    }
    catch {
        return { verification: false, reason: ['ENOTFOUND'] };
    }
}
exports.default = dnsVerifier;
