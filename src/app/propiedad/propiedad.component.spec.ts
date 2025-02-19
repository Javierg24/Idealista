import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadComponent } from './propiedad.component';

describe('PropiedadComponent', () => {
  let component: PropiedadComponent;
  let fixture: ComponentFixture<PropiedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropiedadComponent]
    });
    fixture = TestBed.createComponent(PropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
