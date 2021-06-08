import { Exclude, Type, plainToClass } from 'class-transformer';
import { AppSerializer } from '../../app.serializer';

export class CancelSerializer extends AppSerializer {
	constructor(statusCode: number, code: string, message: string, data: null, errors: any, optional?: Record<string, unknown>) {
		super(statusCode, code, message, data, errors);
	}
}