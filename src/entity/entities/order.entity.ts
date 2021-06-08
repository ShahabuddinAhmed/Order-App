import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderStatusType, PaymentStatusType, DiscountType } from '../../utils/utils.enum';
import { OrderDetailEntity } from './order-detail.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    orderCode: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    actualAmount: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    totalAmount: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        nullable: false
    })
    discount: number;

    @Column({
        type: 'enum',
        enum: DiscountType,
        default: DiscountType.FLAT,
        nullable: false
    })
    discountType: DiscountType;

    @Column({
        type: 'varchar',
        nullable: true
    })
    couponCode: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        nullable: false
    })
    couponValue: number;

    @Column({
        type: 'enum',
        enum: OrderStatusType,
        default: OrderStatusType.CREATED,
        nullable: false
    })
    orderStatus: OrderStatusType;

    @Column({
        type: 'enum',
        enum: PaymentStatusType,
        default: PaymentStatusType.UNPAID,
        nullable: false
    })
    paymentStatus: PaymentStatusType;

    @Column({
        type: 'int',
        nullable: false
    })
    userID: number;

    @CreateDateColumn({
        type: 'datetime',
        nullable: true,
        select: false
    })
    createdAt?: Date | string;

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true,
        select: false
    })
    updatedAt?: Date | string;

    @OneToMany(type => OrderDetailEntity, orderDetail => orderDetail.order)
    orderDetails?: OrderDetailEntity[];
}