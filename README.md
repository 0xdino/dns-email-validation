# dns-email-validation

### About

[![Test CI](https://github.com/0xdino/dns-email-validation/actions/workflows/test.yml/badge.svg)](https://github.com/0xdino/dns-email-validation/actions/workflows/test.yml)

[dns-email-validation](https://github.com/0xdino/dns-email-validation) is a typescript library that performs deep validation for the existence of an email address with validation of DNS records.

The main idea is to receive DNS record data instantly, even if the domain or email was created recently. Improved validation interface.

### Installation:

```bash
npm install dns-email-validation
#OR
yarn add dns-email-validation
#OR
pnpm add dns-email-validation
```

### Interface

By default:

```ts
{
  MX: true;
}
```

You can specify additional settings:

```ts
export interface IDnsEmailValidationOptions {
  MX?: boolean; // validation of MX records
  NS?: boolean; // validation of NS records
  A?: boolean; // validation of A records
}
```

### Error codes

- MX - MX record is missing
- NS - NS record is missing
- A - A record is missing
- BAD_EMAIL - email address was incorrectly
- ENOTFOUND - domain does not exist
- UNKNOWN - unknown error

### Example:

```ts
console.log(await DnsEmailValidation.verify('mail@gmail.com')); // { verification: true }
console.log(await DnsEmailValidation.verify('mail@example.com')); // { verification: false, reason: [ 'MX' ] }
```

Example: [dns-email-validation-example](https://github.com/0xdino/dns-email-validation-example)

### License

Licensed under MIT ([LICENSE](LICENSE) / http://opensource.org/licenses/MIT)
