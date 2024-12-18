import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authCasterGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthenticationService);
  if (authService.isAuthenticated()) {
    if (authService.isCaster()) {
      return true;
    }
    inject(Router).navigate(['/home']);
    return false;
  } 
  else {
    inject(Router).navigate(['/']);
    return false;
  }
};
