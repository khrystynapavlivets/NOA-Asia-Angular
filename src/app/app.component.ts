import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,  HeaderComponent, FooterComponent, RouterModule
    ]
})
export class AppComponent {
  title = 'noa-angular-project';
}
