import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioInfoComponent } from './publicar-anuncio-info.component';

describe('PublicarAnuncioInfoComponent', () => {
  let component: PublicarAnuncioInfoComponent;
  let fixture: ComponentFixture<PublicarAnuncioInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioInfoComponent]
    });
    fixture = TestBed.createComponent(PublicarAnuncioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
