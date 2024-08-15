import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: "cutText",
})
export class CutTextPipe implements PipeTransform {
    transform(text: string | null | undefined, length: number): string {
        if (!text) {
            return '';
        }

        if (text.length <= length) {
            return text;
        } else {
            return `${text.slice(0, length)}...`;
        }
    }
}