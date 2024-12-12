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
  if (authService.currentUserSignal()) {
    const user = authService.currentUserSignal();
    if (user && user.role === 'Caster') {
      return true;
    }
    inject(Router).navigate(['/home']);
    return false;
  } else {
    if (localStorage.getItem('authToken')) {
    }
    inject(Router).navigate(['/']);
    return false;
  }
};
