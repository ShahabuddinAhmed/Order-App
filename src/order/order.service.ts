import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection, UpdateResult } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { HelperService } from '../helper/helper.service';
import { EntityService } from '../entity/entity.service';
import { CreateDto } from './dto/create.dto';
import { CancelDto } from './dto/cancel.dto';
import { CheckStatusDto } from './dto/check-status.dto';
import { OrderEntity } from '../entity/entities/order.entity';
import { OrderDetailEntity } from '../entity/entities/order-detail.entity';
import { DiscountType, OrderStatusType, PaymentStatusType } from '../utils/utils.enum';

@Injectable()
export class OrderService {
    constructor(
		private readonly loggerService: LoggerService,
		private readonly helperService: HelperService,
		private readonly entityService: EntityService,
		private connection: Connection
	) {}

    async createOrder(ip: string, createDto: CreateDto): Promise<{error: string;}> {
		// find all product from db with requested productCode. if not found return error
		// assume all productCode are valid.
		// calculate price with product quantity
		const actualAmount = 12000;
		let totalAmount = 14000; // markup added
		totalAmount -= 1160 // deduct discount price either coupon or promotional discount
		// must be validate requested couponCode
		const orderData: OrderEntity = {
			couponCode: createDto.couponCode,
			couponValue: 0,
			actualAmount,
			totalAmount,
			discount: 0,
			discountType: DiscountType.FLAT,
			orderStatus: OrderStatusType.CREATED,
			paymentStatus: PaymentStatusType.UNPAID,
			userID: 12, // userID get from accessToken
			orderCode: await this.helperService.uniqueID(ip)
		}

		const orderDetailData: OrderDetailEntity = {
			title: 'this title which is get by productCode from db',
			productCode: 'thisProductCodeWhichIsgetbyproductCodefromdb',
			quantity: 12,
			price: 1200,
			userID: 12, // userID get from accessToken
		}

		// start transaction
		const queryRunner = this.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const createOrder = await queryRunner.manager.save(OrderEntity, orderData);
			await queryRunner.manager.save(OrderDetailEntity, { ...orderDetailData, orderId: createOrder.id });
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
			this.loggerService.error(err.message, err.stack);
			return { error: 'Failed to create order' };
		}
		// call payment api
		try {
			const paymentdata = {
				orderID: 125,
				amount: 1250,
				gateway: 'fjjdsfasdfewrtewrtew'
			}
			const response = await axios.post(`${process.env.PAYMENT_HOST}/transaction/create`, paymentdata);
			await this.updateOrderStatus(orderData.orderCode, orderData.userID, PaymentStatusType.PAID, OrderStatusType.CONFIRMED);
			return { error: '' };
		} catch (err) {
			await this.updateOrderStatus(orderData.orderCode, orderData.userID, PaymentStatusType.DECLINED, OrderStatusType.CANCELLED);
			this.loggerService.error(err.response.data.message, err.stack);
			return { error: err.response.data.message };
		}
    }

	private async updateOrderStatus(orderCode: string, userID: number, paymentStatus: PaymentStatusType, orderStatus: OrderStatusType): Promise<UpdateResult> {
		return this.entityService.orderRepo.update({ orderCode, userID }, { paymentStatus, orderStatus });
	}

	async cancelOrder(cancelDto: CancelDto): Promise<{message: string; error: boolean;}> {
		const userID = 12; // get from access token;
		const checkOrder = await this.entityService.orderRepo.findOne({ orderCode: cancelDto.orderCode, userID });
		if (!checkOrder) {
			return { message: 'Invalid Order Code', error: true }
		}
		if (checkOrder.orderStatus === OrderStatusType.DELIVERED) {
			return { message: 'Order already delivered', error: true }
		}
		if (checkOrder.orderStatus === OrderStatusType.CANCELLED) {
			return { message: 'Order already cancelled', error: true }
		}
		await this.entityService.orderRepo.update({ orderCode: cancelDto.orderCode, userID }, { orderStatus: OrderStatusType.CANCELLED });
		return { message: 'Order Cancelled Successfully', error: false }
	}

	async checkOrderstatus(checkStatusDto: CheckStatusDto): Promise<OrderEntity> {
		const userID = 12; // get from access token;
		return this.entityService.orderRepo.findOne({ orderCode: checkStatusDto.orderCode, userID }, { select: ['orderStatus', 'orderCode', 'userID'] });
	}
}
