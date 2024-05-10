import { HttpInterceptorFn } from '@angular/common/http';

export const AuthenticationInterceptor: HttpInterceptorFn = (req,next) => {
  const token = localStorage.getItem('jwt');
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(authReq);
}
