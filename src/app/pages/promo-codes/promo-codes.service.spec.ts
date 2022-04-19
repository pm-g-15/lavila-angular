import { TestBed } from '@angular/core/testing';

import { PromoCodesService } from './promo-codes.service';

describe('PromoCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromoCodesService = TestBed.get(PromoCodesService);
    expect(service).toBeTruthy();
  });
});
