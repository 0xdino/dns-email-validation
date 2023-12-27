import {
  IDnsEmailValidationOptions,
  ERROR_CODE_TYPE,
  IDnsEmailValidationReturns,
} from './interfaces';
import dnsVerifier from './services/dnsVerifier';
import emailVerifier from './services/emailVerifier';

class DnsEmailValidation {
  public async verify(
    email: string,
    options?: IDnsEmailValidationOptions,
  ): Promise<Readonly<IDnsEmailValidationReturns>> {
    try {
      if (emailVerifier(email) === false)
        return { verification: false, reason: ['BAD_EMAIL'] };

      return dnsVerifier(email, options || { MX: true });
    } catch (e) {
      console.error('DnsEmailValidation::', e);
      return { verification: false, reason: ['UNKNOWN'] };
    }
  }
}

export default new DnsEmailValidation();

export {
  type IDnsEmailValidationOptions,
  type ERROR_CODE_TYPE,
  type IDnsEmailValidationReturns,
};
