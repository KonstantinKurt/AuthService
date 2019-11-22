import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[appAvatar]'
})
export class AvatarChangeSizeDirective {

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        console.log(`Directive works!!`, element);
    }

}
