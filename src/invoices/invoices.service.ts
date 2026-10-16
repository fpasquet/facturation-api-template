import { Inject, Injectable } from '@nestjs/common';
import type pg from 'pg';
import { DATABASE } from '../database.js';
import { type Invoice, invoiceNumber, type NewInvoice } from './invoice.js';

interface InvoiceRow {
  id: number;
  customer: string;
  amount_cents: number;
  issued_at: Date;
}

const toInvoice = (row: InvoiceRow): Invoice => ({
  id: row.id,
  number: invoiceNumber(row.id, row.issued_at),
  customer: row.customer,
  amountCents: row.amount_cents,
  issuedAt: row.issued_at.toISOString(),
});

@Injectable()
export class InvoicesService {
  constructor(@Inject(DATABASE) private readonly db: pg.Pool) {}

  async list(): Promise<Invoice[]> {
    const { rows } = await this.db.query<InvoiceRow>(
      'select id, customer, amount_cents, issued_at from invoice order by id desc',
    );
    return rows.map(toInvoice);
  }

  async create({ customer, amountCents }: NewInvoice): Promise<Invoice> {
    const { rows } = await this.db.query<InvoiceRow>(
      'insert into invoice (customer, amount_cents) values ($1, $2) returning id, customer, amount_cents, issued_at',
      [customer, amountCents],
    );
    const [row] = rows;
    if (!row) throw new Error('Facture non enregistrée.');
    return toInvoice(row);
  }
}
