import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entity/entities/order.entity';
import { OrderDetailEntity } from '../entity/entities/order-detail.entity';

@Injectable()
export class EntityService {
    constructor(
        @InjectRepository(OrderEntity)
        public readonly orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderDetailEntity)
        public readonly orderDetailRepo: Repository<OrderDetailEntity>
    ) {}
}
