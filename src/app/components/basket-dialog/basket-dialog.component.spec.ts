import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
