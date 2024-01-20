export interface IDnsEmailValidationOptions {
    MX?: boolean;
    NS?: boolean;
    A?: boolean;
}
export type ERROR_CODE_TYPE = Readonly<'MX' | 'NS' | 'A' | 'BAD_EMAIL' | 'UNKNOWN' | 'ENOTFOUND'>;
export interface IDnsEmailValidationReturns {
    verification: Readonly<boolean>;
    reason?: Readonly<ERROR_CODE_TYPE[]>;
}
