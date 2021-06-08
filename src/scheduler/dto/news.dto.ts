import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum NewsQueryType {
	RECENT = 'Recent',
	ALL = 'All',
}

export class NewsDTO {
    @ApiProperty({
        example: 'Recent',
        description: 'Type of the news'
    })
	@IsNotEmpty()
	@IsEnum(NewsQueryType)
    @IsString()
	readonly newsQuery: NewsQueryType;
}