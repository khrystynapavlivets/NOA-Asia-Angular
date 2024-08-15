import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account/account.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, SharedModule, MatSelectModule],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent implements OnInit {
  constructor(
    private router: Router,
    public accountService: AccountService,
 
  ) { }

  ngOnInit(): void {
  }



  signOut(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem('currentUser');
      this.accountService.isUserLogin$.next(true);
    });
  }
}
