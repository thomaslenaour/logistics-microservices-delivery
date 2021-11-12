import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class ShippingRequestDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public orderId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public nbProducts!: number;
}

export class CreateShippingRequestDto extends OmitType(ShippingRequestDto, [
  'id',
]) {}

export class UpdateShippingRequestDto extends PartialType(
  CreateShippingRequestDto,
) {}
