import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account/account.service';
import { ROLE } from '../../shared/constants/role.constant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule],
  templateUrl: './auth-user-dialog.component.html',
  styleUrl: './auth-user-dialog.component.scss'
})
export class AuthUserDialogComponent {
  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLogin = true;
  public hide = true;
  public checkError = false;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthUserDialogComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
        ]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordRepeat: [null, [Validators.required, Validators.minLength(6)]],
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login');
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }




  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe((user: { [x: string]: ROLE; }) => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e: any) => {
      console.log('error', e);
    })
  }

  async registerUser(): Promise<any> {
    const { email, password, firstName, lastName, phoneNumber } =
      this.registerForm.value;
    this.emailSignUp(email, password, firstName, lastName, phoneNumber)
      .then(() => {
        this.toastr.info('Вітаю ви зареєстровані!');
        this.isLogin = !this.isLogin;
        this.registerForm.reset();
        this.dialogRef.close();
      })
      .catch((e) => {
        this.toastr.error('Помилка реєстрації!', e.message);
      });
  }



  async emailSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string): Promise<any> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = {
        email: credential.user.email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        orders: [],
        role: 'USER'
      };
      await setDoc(doc(this.afs, 'users', credential.user.uid), user);
    } catch (error) {
      this.toastr.error('Error creating user:');
      console.error('Error creating user:', error);
    }
  }



  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }
}