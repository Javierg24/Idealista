import { TestBed } from '@angular/core/testing';

import { LocalesComercialesService } from './locales-comerciales.service';

describe('LocalesComercialesService', () => {
  let service: LocalesComercialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalesComercialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
