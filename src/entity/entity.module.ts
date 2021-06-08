import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from './entity.service';
import { OrderEntity } from '../entity/entities/order.entity';
import { OrderDetailEntity } from '../entity/entities/order-detail.entity';

const entities = [
    OrderEntity,
	OrderDetailEntity
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(entities)
    ],
    exports: [
        TypeOrmModule.forFeature(entities),
        EntityService
    ],
    providers: [EntityService]
})
export class EntityModule {}
