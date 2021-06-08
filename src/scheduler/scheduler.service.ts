import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection, In } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { HelperService } from '../helper/helper.service';
import { EntityService } from '../entity/entity.service';
import { OrderStatusType } from '../utils/utils.enum';
import { OrderEntity } from '../entity/entities/order.entity';

@Injectable()
export class SchedulerService {
	constructor(
		private readonly loggerService: LoggerService,
		private readonly helperService: HelperService,
		private readonly entityService: EntityService,
		private connection: Connection
	) {}

	@Cron(CronExpression.EVERY_5_MINUTES)
	async updateOrderStatus() {
		let count = 1;
		while (count > 0) {
			try {
				const orders = await this.connection
				.getRepository(OrderEntity)
				.createQueryBuilder('order')
				.take(25)
				.getMany();
				const ids = orders.map(order => order.id);
				await this.entityService.orderRepo.update({ id: In(ids) }, { orderStatus: OrderStatusType.DELIVERED });
				count = await this.entityService.orderRepo.count({ orderStatus: OrderStatusType.CONFIRMED });
			} catch (err) {
				this.loggerService.error(err.message, err.stack);
			}
		}
	}
}
