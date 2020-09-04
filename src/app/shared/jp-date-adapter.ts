import { NativeDateAdapter } from '@angular/material/core';
// NativeDateAdapterの一部を上書きしたJPDateAdapterを作る
export class JPDateAdapter extends NativeDateAdapter {
    getDateNames(): string[] {
        return Array.from(Array(31), (v, k) => `${k + 1}`);
    }
}