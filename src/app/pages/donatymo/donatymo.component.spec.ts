import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatymoComponent } from './donatymo.component';

describe('DonatymoComponent', () => {
  let component: DonatymoComponent;
  let fixture: ComponentFixture<DonatymoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatymoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatymoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
