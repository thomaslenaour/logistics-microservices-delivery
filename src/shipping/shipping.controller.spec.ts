import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ShippingController } from './shipping.controller';

describe('ShippingController', () => {
  let controller: ShippingController;
  const apiUrl = 'http://localhost:3000/api/shipping';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingController],
    }).compile();

    controller = module.get(ShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return HTTP Status 204', async () => {
    const res = await axios.post(apiUrl, {
      orderId: '12345ncrubuz23',
      nbProducts: 5,
    });

    expect(res.status).toEqual(204);
  });

  it('should return HTTP Status 400 for a bad request', async () => {
    await expect(() =>
      axios.post(apiUrl, {
        orderId: '12345ncrubuz23',
      }),
    ).rejects.toThrow();
  });
});
