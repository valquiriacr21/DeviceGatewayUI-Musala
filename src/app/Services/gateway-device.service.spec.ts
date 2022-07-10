import { TestBed } from '@angular/core/testing';

import { GatewayDeviceService } from './gateway-device.service';

describe('GatewayDeviceService', () => {
  let service: GatewayDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewayDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
