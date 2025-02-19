import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderYellowComponent } from './header-yellow.component';

describe('HeaderYellowComponent', () => {
  let component: HeaderYellowComponent;
  let fixture: ComponentFixture<HeaderYellowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderYellowComponent]
    });
    fixture = TestBed.createComponent(HeaderYellowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
