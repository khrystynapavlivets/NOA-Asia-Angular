import { Component,  OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../shared/services/account/account.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  Auth,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { doc, docData, Firestore} from "@angular/fire/firestore";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ROLE } from "../../shared/constants/role.constant";
import { CommonModule } from "@angular/common";





@Component({
  selector: "app-authorization",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,

  ],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }


  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toaster.success("User successfully login");
      })
      .catch((e) => {
        this.toaster.error(e.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    console.log(credential);
    
    docData(doc(this.afs, "users", credential.user.uid)).subscribe(
      (user: { [x: string]: ROLE; }) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        if (user && user["role"] === ROLE.USER) {
          this.router.navigate(["/cabinet"]);
        } else if (user && user["role"] === ROLE.ADMIN) {
          this.router.navigate(["/admin"]);
        }
        this.accountService.isUserLogin$.next(true);
      },
      (e: any) => {
        console.log("error", e);
      },
    );
  }
}
