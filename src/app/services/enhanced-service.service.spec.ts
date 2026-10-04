import { TestBed } from '@angular/core/testing';

import { EnhancedServiceService } from './enhanced-service.service';

describe('EnhancedServiceService', () => {
  let service: EnhancedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnhancedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
