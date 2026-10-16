import { describe, expect, it } from 'vitest';
import { invoiceNumber, newInvoice } from './invoice.js';

describe('invoiceNumber', () => {
  it('gives the year and a four digit number', () => {
    expect(invoiceNumber(42, new Date('2026-10-13T10:00:00Z'))).toBe('FAC-2026-0042');
  });
});

describe('newInvoice', () => {
  it('trims the customer and keeps the amount in cents', () => {
    expect(newInvoice({ customer: '  Atelier   Moreau ', amountCents: 12_000 })).toEqual({
      customer: 'Atelier Moreau',
      amountCents: 12_000,
    });
  });

  it('refuses a missing customer or an amount that is not a whole number of cents', () => {
    expect(newInvoice({ customer: '  ', amountCents: 100 })).toBeNull();
    expect(newInvoice({ customer: 'Atelier Moreau', amountCents: 10.5 })).toBeNull();
    expect(newInvoice(null)).toBeNull();
  });
});
