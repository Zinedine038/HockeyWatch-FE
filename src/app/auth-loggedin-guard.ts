import { inject } from "@angular/core"
import { AuthenticationService } from "./authentication.service";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from "@angular/router";

export const authLoggedInGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);
    console.log(authService.isAuthenticated())
    if(authService.isAuthenticated()) {
        inject(Router).navigate(['/home']);
        return false;
    }
    return true;

}