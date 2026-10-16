import { Module } from '@nestjs/common';
import { connect, DATABASE } from './database.js';
import { HealthController } from './health.controller.js';
import { InvoicesController } from './invoices/invoices.controller.js';
import { InvoicesService } from './invoices/invoices.service.js';

@Module({
  controllers: [HealthController, InvoicesController],
  providers: [{ provide: DATABASE, useFactory: () => connect() }, InvoicesService],
})
export class AppModule {}
