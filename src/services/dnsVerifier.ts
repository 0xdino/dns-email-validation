import {
  ERROR_CODE_TYPE,
  IDnsEmailValidationOptions,
  IDnsEmailValidationReturns,
} from '../interfaces';
import { resolve } from 'node:dns';
import { promisify } from 'node:util';

const resolveAsync = promisify(resolve);

export default async function dnsVerifier(
  email: string,
  options: IDnsEmailValidationOptions,
): Promise<Readonly<IDnsEmailValidationReturns>> {
  try {
    const _email = email.split('@')[1];

    let MX = false;
    let NS = false;
    let A = false;

    for (const record of await resolveAsync(_email, 'MX')) {
      if (record.exchange.length > 0) MX = true;
    }
    for (const record of await resolveAsync(_email, 'NS')) {
      if (record.length > 0) NS = true;
    }
    for (const record of await resolveAsync(_email, 'A')) {
      if (record.length > 0) A = true;
    }

    const reason: ERROR_CODE_TYPE[] = [];
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
  } catch {
    return { verification: false, reason: ['ENOTFOUND'] };
  }
}
