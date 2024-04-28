import { HttpErrorResponse } from '@angular/common/http';

// pulls each parameter from the WWW-Authenticate header and creates an object with the key and value
export const formatStepupErrorResponse = (httpError: HttpErrorResponse): {} => {
    const authResponse = httpError.headers.get('WWW-Authenticate') ?? '';
    const paramArr = (authResponse.replace('Bearer ', '').split(',') ?? []).map(el => el.replaceAll('"', '').split('='));
    return Object.fromEntries(paramArr);
}