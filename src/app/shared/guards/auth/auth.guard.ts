import {
  CanActivateFn,
  UrlTree,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Routes,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ROLE } from "../../constants/role.constant";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LOCAL_STORAGE } from './local-storage.token'; // Вкажіть правильний шлях до токену

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const localStorage = inject(LOCAL_STORAGE);

  const currentUserString = localStorage ? localStorage.getItem("currentUser") : null;
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  const routes: Routes = [
    {
      // path: "protected-route",
      canActivate: [AuthGuard],
    },
  ];

  return of(
    currentUser &&
      (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER),
  ).pipe(
    map((authorized) => {
      if (!authorized) {
        router.navigate([""]); 
      }
      return authorized;
    }),
    tap((authorized) => {
      if (!authorized) {
        console.warn("User is not authorized for this route");
      }
    }),
  );
};
