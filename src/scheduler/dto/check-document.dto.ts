import { IsNotEmpty, IsString, IsObject, IsArray, ValidateNested, ArrayContains, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


enum DocumentGroupType {
	AIRLINE_CREW = 'AirlineCrew',
	ALIEN_RESIDENTS  = 'AR',
	GOVERNMENT_DUTY_PASSPORTS = 'D',
	MERCHANT_SEAMEN = 'MS',
	MILITARY = 'Military',
	NORMAL_PASSPORT = 'N',
	OTHER = 'Other',
	STATELESS_AND_REFUGEES = 'SR'
}

export class CheckDocumentDTO {
    @ApiProperty({
        example: '2013-11-20T15:15:15-00:00',
        description: 'Departure date'
    })
    @IsOptional()
    @IsString()
	// @IsDateString()
	readonly departDate: string | Date;
	
    @ApiProperty({
        example: '2013-11-20T00:18:18-01:00',
        description: 'Arrival date'
    })
    @IsNotEmpty()
    @IsString()
	@IsDateString()
	readonly arrivalDate: string | Date;
	
    @ApiProperty({
        example: 'Country code of destination',
        description: 'US'
    })
    @IsNotEmpty()
    @IsString()
	readonly destinationCode: string;
	
    @ApiProperty({
        example: 'Nationality country code',
        description: 'BD'
    })
    @IsNotEmpty()
    @IsString()
	readonly nationalityCode: string;
    
    @ApiProperty({
        example: 'Country code of resident',
        description: 'BD'
    })
    @IsOptional()
    @IsString()
	readonly residentCountryCode: string;
    
    @ApiProperty({
        example: 'Country code of issue',
        description: 'BD'
    })
    @IsOptional()
    @IsString()
	readonly issueCountryCode: string;
    
    @ApiProperty({
        example: 'Country code of birth Date',
        description: 'BD'
    })
    @IsOptional()
    @IsString()
	readonly birthCountryCode: string;
    
    @ApiProperty({
        example: 'departure of Airport Code',
        description: 'ATL'
    })
    @IsOptional()
    @IsString()
	readonly departAirportCode: string;
    
    @ApiProperty({
        example: 'document type name',
        description: 'N'
    })
    @IsNotEmpty()
	@IsEnum(DocumentGroupType)
    @IsString()
	readonly documentGroup: DocumentGroupType;
    
    @ApiProperty({
        example: 'Name of the document type',
        description: 'passport'
    })
    @IsNotEmpty()
    @IsString()
	readonly documentType: string;
    
    @ApiProperty({
        example: 'document feature name',
        description: 'biometric'
    })
    @IsOptional()
    @IsString()
	readonly documentFeature: string;
    
    @ApiProperty({
        example: 'document language name',
        description: 'EN'
    })
    @IsOptional()
    @IsString()
	readonly documentLanguage: string;
    
    @ApiProperty({
        example: 'Is ticket available',
        description: 'ticket'
    })
    @IsOptional()
    @IsString()
	readonly ticket: string;
    
    @ApiProperty({
        example: 'issue Date',
        description: '2007-01-01'
    })
    @IsOptional()
    @IsString()
	readonly issueDate: string | Date;
    
    @ApiProperty({
        example: 'expiry Date',
        description: '2017-01-01'
    })
    @IsOptional()
    @IsString()
	readonly expiryDate: string | Date;
    
    @ApiProperty({
        example: 'number of days to stay',
        description: '10'
    })
    @IsOptional()
    @IsString()
	readonly stayDuration: string;
    
    @ApiProperty({
        example: 'stay Type name',
        description: 'vacation'
    })
    @IsOptional()
    @IsString()
	readonly stayType: string;
    
    @ApiProperty({
        example: 'birthday',
        description: '1994-01-01'
    })
    @IsOptional()
    @IsString()
	readonly birthDate: string | Date;
    
    @ApiProperty({
        example: 'visa data',
        description: 'novisa'
    })
    @IsOptional()
    @IsString()
	readonly visa: string;

    @ApiProperty({
        example: 'visa data',
        description: 'If visa data is added, all field must be required'
    })
    @IsOptional()
    @IsArray()
	@ValidateNested({
		each: true
	})
	@Type(() => VisaData)
	readonly visaData: VisaData[];
    
    @ApiProperty({
        example: 'carrier Code',
        description: 'KL'
    })
    @IsOptional()
    @IsString()
	readonly carrierCode: string;
    
    @ApiProperty({
        example: 'transit Country',
        description: 'Only airportCode is mandatory for transitCountry'
    })
    @IsOptional()
    @IsArray()
	@ValidateNested({
		each: true
	})
	@Type(() => TransitCountry)
	readonly transitCountries: TransitCountry[];
    
    @ApiProperty({
        example: 'Passport',
        description: 'section name'
    })
    @IsNotEmpty()
    @IsString()
	readonly section: string;
    
    @ApiProperty({
        example: 'M',
        description: 'name of the gender'
    })
    @IsOptional()
    @IsString()
	readonly gender: string;
    
    @ApiProperty({
        example: 'BD',
        description: 'Recent visited countries'
    })
    @IsOptional()
    @IsString()
	readonly countriesVisited: string;
}

export class VisaData {
    @ApiProperty({
        example: 'visaType',
        description: 'A1'
    })
	@IsNotEmpty()
    @IsString()
	readonly visaType: string;
	
    @ApiProperty({
        example: 'country name of the issued visa',
        description: 'A1'
    })
	@IsNotEmpty()
    @IsString()
	readonly issuedBy: string;

    @ApiProperty({
        example: 'expiry Date visa',
        description: '2014-12-31T01:00:00.000'
    })
	@IsNotEmpty()
    @IsString()
	readonly expiryDate: string;
}


export class TransitCountry {
    @ApiProperty({
        example: 'airport Code',
        description: 'JFK'
    })
	@IsNotEmpty()
    @IsString()
	readonly airportCode: string;
	
    @ApiProperty({
        example: 'arrival Timestamp',
        description: '2013-11-20T17:00:00-00:00'
    })
	@IsOptional()
    @IsString()
	readonly arrivalTimestamp: string;

    @ApiProperty({
        example: 'depart Timestamp',
        description: '2013-11-20T17:00:00-00:00'
    })
	@IsOptional()
    @IsString()
	readonly departTimestamp: string;

	@ApiProperty({
        example: 'depart Timestamp',
        description: 'ticket'
    })
	@IsOptional()
    @IsString()
	readonly ticket: string;

	@ApiProperty({
        example: 'Is visa available or not',
        description: 'novisa'
    })
	@IsOptional()
    @IsString()
	readonly visa: string;

	@ApiProperty({
        example: 'visa data',
        description: 'If visa data is added, all field must be required'
    })
    @IsOptional()
    @IsArray()
	@ValidateNested({
		each: true
	})
	@Type(() => VisaData)
	readonly visaData: VisaData[];
}