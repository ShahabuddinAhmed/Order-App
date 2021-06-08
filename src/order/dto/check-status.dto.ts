import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckStatusDto {
    @ApiProperty({
        example: 'CPGH1200',
        description: 'order Code'
    })
	@IsNotEmpty()
    @IsString()
    readonly orderCode: string;
}