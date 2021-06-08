import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_detail')
export class OrderDetailEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    productCode: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    quantity: number;

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

    @ManyToOne(type => OrderEntity, order => order.orderDetails)
    @JoinColumn()
    order?: OrderEntity;
}