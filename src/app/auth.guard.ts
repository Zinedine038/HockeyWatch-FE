import { inject } from "@angular/core"
import { AuthenticationService } from "./authentication.service";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from "@angular/router";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);
        
    if(authService.currentUserSignal()) {
        return true;
    }
    inject(Router).navigate(['/']);
    return false;

}