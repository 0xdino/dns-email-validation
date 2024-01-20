import { IDnsEmailValidationOptions, ERROR_CODE_TYPE, IDnsEmailValidationReturns } from './interfaces';
declare class DnsEmailValidation {
    verify(email: string, options?: IDnsEmailValidationOptions): Promise<Readonly<IDnsEmailValidationReturns>>;
}
declare const _default: DnsEmailValidation;
export default _default;
export { type IDnsEmailValidationOptions, type ERROR_CODE_TYPE, type IDnsEmailValidationReturns, };
