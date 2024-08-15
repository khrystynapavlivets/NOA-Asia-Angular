import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account/account.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from "../../../shared/shared.module";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, SharedModule ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent {
  public userForm!: FormGroup;
  private currentUserId!: string;
  public user: any = {};

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initUserForm();
    this.update();
  }

  initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      address: [null, [Validators.required]],
    });
  }

  update(): void {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email
        });
        this.currentUserId = this.user.uid;
      }
    }
  }


  saveChanges(): void {
    if (this.currentUserId) {
      const updatedUser = this.userForm.value;
      console.log(updatedUser);
      this.accountService.updateUserFirebase(updatedUser, this.currentUserId)
        .then(() => {
          this.toastr.success('Зміни збережено успішно!');
          localStorage.setItem('currentUser', JSON.stringify({ ...this.user, ...updatedUser }));
        })
        .catch((error) => {
          this.toastr.error('Помилка при збереженні змін: ' + error.message);
        });
    } else {
      this.toastr.warning('Перевірте правильність введених даних.');
    }
  }


  signOut(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem('currentUser');
      this.accountService.isUserLogin$.next(true);
    });
  }

  openAddressModal(): void {
    document.body.classList.add('dialog-backdrop-blur');
    console.log('Class added to body:', document.body.classList);

    const dialogRef = this.dialog.open(AddressDialogComponent, {
      backdropClass: 'custom-backdrop',
      autoFocus: false,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      document.body.classList.remove('dialog-backdrop-blur');
      console.log('Class removed from body:', document.body.classList);
    });
  }

}
