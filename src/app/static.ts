import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Static {
    passwordRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    errorBorder = 'solid 1px #ea352d';

}