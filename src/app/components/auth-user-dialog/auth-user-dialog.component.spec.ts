import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserDialogComponent } from './auth-user-dialog.component';

describe('AuthUserDialogComponent', () => {
  let component: AuthUserDialogComponent;
  let fixture: ComponentFixture<AuthUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
