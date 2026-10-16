import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');
// L'interface appelle l'API directement depuis le navigateur.
app.enableCors({ origin: process.env['APP_URL'] ?? 'http://localhost:3010' });
app.enableShutdownHooks();
await app.listen(Number(process.env['PORT'] ?? 4010));
