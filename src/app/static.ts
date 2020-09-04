import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Static {
    passwordRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // 半角英数字8文字以上
    zenkakuKana: RegExp = /^[ァ-ンヴー]*$/;
    zenkakuHiragana: RegExp = /^[ぁ-んー]*$/;
    decimal: RegExp = /^[0-9]+$/;
    errorBorder = 'solid 1px #ea352d';

}