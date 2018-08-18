import { Headers } from '@angular/http';
import { IRequestOption } from 'core-services/core';

export const REQUEST_OPTIONS = <IRequestOption>{
    server: 'bi-api',
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
};