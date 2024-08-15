import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from "../../../../shared/shared.module";
import { IUserFullRequest } from '../../../../shared/interfaces/account/account.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss'
})
export class AddressDialogComponent {
  public user: any = {};
  public userAddressForm!: FormGroup;
  private currentUserId!: string;

  constructor(
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }



  ngOnInit(): void {
    this.initUserForm();
    this.update();
  }

  initUserForm(): void {
    this.userAddressForm = this.fb.group({
      address: [null, [Validators.required]],
      street: [null, [Validators.required]],
      house: [null, [Validators.required]],
      flat: [null, [Validators.required]],
      entrance: [null, [Validators.required]],
      floor: [null, [Validators.required]],
      intercom: [null]
    });
  }

  update(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.userAddressForm.patchValue({
        address: this.user.address,
        street: this.user.street,
        house: this.user.house,
        flat: this.user.flat,
        entrance: this.user.entrance,
        floor: this.user.floor,
        intercom: this.user.intercom,
      });
      this.currentUserId = this.user.uid;

      console.log(this.user.address);
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.update();
    })
  }

  saveUser(): void {
    if (this.currentUserId) {
      const updatedUser = this.userAddressForm.value;
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

  getUser(): void {
    this.accountService.getOneFirebase(this.currentUserId).subscribe(data => {
      this.user = data as IUserFullRequest;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.checkUpdatesUserLogin();
    })
  }

  closeModal(): void {
    document.body.classList.remove('dialog-backdrop-blur');
    this.dialog.closeAll();
  }
  onSave(): void {
    this.saveUser();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
