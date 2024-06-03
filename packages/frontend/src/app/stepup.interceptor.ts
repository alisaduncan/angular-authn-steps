import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { INSUFFICIENT_AUTH, StepupError, formatStepupErrorResponse } from './authn';

const handleError = (httpError: HttpErrorResponse): Observable<never> => {
  const allowedOrigins = ['/api'];
  if (httpError.status !== HttpStatusCode.Unauthorized || !allowedOrigins.find(origin => httpError.url?.includes(origin))) {
    return throwError(() => httpError);
  }

  let returnError = httpError;
  const wwwAuthenticateHeader = httpError.headers.get('WWW-Authenticate');
  if (wwwAuthenticateHeader && wwwAuthenticateHeader.includes(INSUFFICIENT_AUTH)) {
    const stepupError = formatStepupErrorResponse(httpError);
    return throwError(() => ({name: stepupError.error, message: stepupError.acr_values}));
  }
  
  return throwError(() => returnError);
}

export const stepupAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleError));
};
