import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, HttpStatus, HttpCode,
    Req, Body, Query, Get, InternalServerErrorException, Ip } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { LoggerService } from '../logger/logger.service';
import { HelperService } from '../helper/helper.service';
import { CreateDto } from './dto/create.dto';
import { CancelDto } from './dto/cancel.dto';
import { CheckStatusDto } from './dto/check-status.dto';
import { CreateSerializer } from './serializer/create.serializer';
import { CancelSerializer } from './serializer/cancel.serializer';
import { CheckStatusSerializer } from './serializer/check-status.serializer';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(
		private readonly orderService: OrderService,
		private readonly loggerService: LoggerService,
		private readonly helperService: HelperService
	) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Created Order' })
    @ApiCreatedResponse({})
    async createOrder(@Ip() ip: string, @Body() createDto: CreateDto): Promise<CreateSerializer> {
		try {
			const { error } = await this.orderService.createOrder(ip, createDto);
			if (error) {
				return new CreateSerializer(HttpStatus.BAD_REQUEST, 'E_CREATE_ORDER', 'Failed to Create Order', null, [error]);
			}
			return new CreateSerializer(HttpStatus.OK, 'SUCCESS', 'Order Created Successfully', null, []);
		} catch (err) {
			this.loggerService.error(err.message, err.stack);
			throw new InternalServerErrorException();
		}
    }

	@UseInterceptors(ClassSerializerInterceptor)
    @Post('cancel')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cancel Order' })
    @ApiCreatedResponse({})
    async cancelOrder(@Body() cancelDto: CancelDto): Promise<CancelSerializer> {
		try {
			const { message, error } = await this.orderService.cancelOrder(cancelDto);
			if (error) {
				return new CancelSerializer(HttpStatus.BAD_REQUEST, 'E_CANCEL_ORDER', message, null, [message]);
			}
			return new CancelSerializer(HttpStatus.OK, 'SUCCESS', message, null, []);
		} catch (err) {
			this.loggerService.error(err.message, err.stack);
			throw new InternalServerErrorException();
		}
    }

	@UseInterceptors(ClassSerializerInterceptor)
    @Get('check-status')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Cancel Order' })
    @ApiCreatedResponse({})
    async checkOrderstatus(@Query() checkStatusDto: CheckStatusDto): Promise<CheckStatusSerializer> {
		try {
			const checkOrderstatus = await this.orderService.checkOrderstatus(checkStatusDto);
			if (!checkOrderstatus) {
				return new CheckStatusSerializer(HttpStatus.BAD_REQUEST, 'E_CHECK_ORDER_STATUS', 'Invalid Order Code', null, ['Invalid Order Code']);
			}
			return new CheckStatusSerializer(HttpStatus.OK, 'SUCCESS', 'Order Status', checkOrderstatus, []);
		} catch (err) {
			this.loggerService.error(err.message, err.stack);
			throw new InternalServerErrorException();
		}
    }
}
