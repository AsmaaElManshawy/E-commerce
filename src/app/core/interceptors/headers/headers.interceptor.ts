import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // logic REQ ----> send headers

  if (localStorage.getItem('token')) {
    req = req.clone({
      // options of REQ
      setHeaders: {
        token: localStorage.getItem('token')!,
      },
    });
  }
  return next(req);
};
