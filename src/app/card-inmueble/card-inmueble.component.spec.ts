import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInmuebleComponent } from './card-inmueble.component';

describe('CardInmuebleComponent', () => {
  let component: CardInmuebleComponent;
  let fixture: ComponentFixture<CardInmuebleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardInmuebleComponent]
    });
    fixture = TestBed.createComponent(CardInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
