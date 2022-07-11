import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysPeripheralDevicesComponent } from './gateways-peripheral-devices.component';

describe('GatewaysPeripheralDevicesComponent', () => {
  let component: GatewaysPeripheralDevicesComponent;
  let fixture: ComponentFixture<GatewaysPeripheralDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaysPeripheralDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewaysPeripheralDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
