import { ApiProperty } from '@nestjs/swagger';

export class HttpError {
  @ApiProperty()
  public message!: string;

  @ApiProperty()
  public statusCode!: number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  public error!: string[] | string;
}
