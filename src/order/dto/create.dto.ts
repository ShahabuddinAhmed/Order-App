import { IsNotEmpty, IsString, IsNumber, IsPositive, ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDetails {
    @ApiProperty({
        example: 'PONK365255555585',
        description: 'unique code of the product'
    })
    @IsNotEmpty()
    @IsString()
    readonly productCode: string;

    @ApiProperty({
        example: '2',
        description: 'number of the product quantity'
    })
    @IsPositive()
    @IsNumber()
    readonly quantity: number;
}

export class CreateDto {
    @ApiProperty({
        example: 'CPGH1200',
        description: 'coupon code'
    })
    @IsString()
    readonly couponCode: string;

    @ApiProperty({
        example: ProductDetails,
        description: 'detail of the product'
    })
    @ArrayNotEmpty()
    @IsArray()
	@ValidateNested({
		each: true
	})
	@Type(() => ProductDetails)
    readonly productDetails: ProductDetails[];
}
