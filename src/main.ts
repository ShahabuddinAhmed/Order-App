import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useLogger(app.get(LoggerService));
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
  	app.setGlobalPrefix('api/v1');

	const options = new DocumentBuilder()
		.setTitle('Order API')
		.setDescription('Welcome to Order App API')
		.setVersion('1.0')
		.setTermsOfService('TOS')
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api/v1/doc', app, document);

	const PORT = process.env.PORT || 3000;
	await app.listen(PORT);
	console.log(`Order App API is Running On PORT ${ PORT }`);
}
bootstrap();
