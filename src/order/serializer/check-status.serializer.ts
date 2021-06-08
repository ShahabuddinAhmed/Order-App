import { Exclude, Type, plainToClass } from 'class-transformer';
import { AppSerializer } from '../../app.serializer';
import { OrderEntity } from '../../entity/entities/order.entity';

class CheckStatus {
    orderStatus: string;
	
	@Exclude()
	orderCode: string;

	@Exclude()
	userID: number;
}

export class CheckStatusSerializer extends AppSerializer {
	constructor(statusCode: number, code: string, message: string, data: OrderEntity, errors: any, optional?: Record<string, unknown>) {
		super(statusCode, code, message, plainToClass(CheckStatus, data), errors);
	}
}