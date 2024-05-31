import { HttpErrorResponse } from '@angular/common/http';

export const INSUFFICIENT_AUTH = 'insufficient_user_authentication';
export const ACR_VALUES_1FA = 'urn:okta:loa:1fa:any';
export const ACR_VALUES_PHR = 'phr';

export interface StepupHttpErrorResponse {
    error: string;
    error_description: string;
    acr_values: string;
    max_age?: string;
}
  
export interface StepupError {
    name: string;
    message: string;
}

// pulls each parameter from the WWW-Authenticate header and creates an object with the key and value
export const formatStepupErrorResponse = (httpError: HttpErrorResponse): StepupHttpErrorResponse => {
    const authResponse = httpError.headers.get('WWW-Authenticate') ?? '';
    const paramArr = (authResponse.replace('Bearer ', '').split(',') ?? []).map(el => el.replaceAll('"', '').split('='));
    return Object.fromEntries(paramArr) as StepupHttpErrorResponse;
}