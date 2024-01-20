import DnsEmailValidation from '../dist';

describe('DnsEmailValidation', () => {
  it('Checking an incorrectly specified email address', async () => {
    expect(await DnsEmailValidation.verify('bad@email')).toEqual({
      verification: false,
      reason: ['BAD_EMAIL'],
    });
  });

  it('Checking email address with the incorrect MX record', async () => {
    expect(
      await DnsEmailValidation.verify('bad@example.com', {
        MX: true,
        NS: true,
        A: true,
      }),
    ).toEqual({ verification: false, reason: ['MX'] });
  });

  it('Verifying the correct email address', async () => {
    expect(
      await DnsEmailValidation.verify('email@gmail.com', {
        MX: true,
        NS: true,
        A: true,
      }),
    ).toEqual({
      verification: true,
    });
  });

  it('Verifying the bad domain', async () => {
    expect(await DnsEmailValidation.verify('admin@local.local')).toEqual({
      verification: false,
      reason: ['ENOTFOUND'],
    });
  });
});
