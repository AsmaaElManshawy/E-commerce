import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // Logic Error
      // error message
      // err.error.message;
      toastrService.error(err.error.message, 'FreshCart');
      console.log(err);

      return throwError(() => err);
    })
  ); // logic RES
};
