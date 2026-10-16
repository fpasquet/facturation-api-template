import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { type Invoice, newInvoice } from './invoice.js';
import { InvoicesService } from './invoices.service.js';

@Controller('invoices')
export class InvoicesController {
  constructor(@Inject(InvoicesService) private readonly invoices: InvoicesService) {}

  @Get()
  list(): Promise<Invoice[]> {
    return this.invoices.list();
  }

  @Post()
  create(@Body() body: unknown): Promise<Invoice> {
    const input = newInvoice(body);
    if (!input) throw new BadRequestException('Une facture a un client et un montant en centimes.');
    return this.invoices.create(input);
  }
}
