import { IDnsEmailValidationOptions, IDnsEmailValidationReturns } from '../interfaces';
export default function dnsVerifier(email: string, options: IDnsEmailValidationOptions): Promise<Readonly<IDnsEmailValidationReturns>>;
