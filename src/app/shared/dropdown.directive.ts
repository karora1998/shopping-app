import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';


@Directive({
	selector: '[appDropdown]'
})

export class DropdownDirective {
	
	// isOpen: boolean = false;

	@HostBinding('class.open') isOpen: boolean = false;

	constructor(private elRef: ElementRef, private renderer: Renderer2) { }

	@HostListener('click') toggleOpen(eventData: Event){
 	// if(!this.isOpen) {
 	// 	this.renderer.addClass(this.elRef.nativeElement, 'open');
 	// 	this.isOpen = !this.isOpen;
 	// } else {
 	// 	this.renderer.removeClass(this.elRef.nativeElement, 'open');
 	// 	this.isOpen = !this.isOpen;
 	// }
 	this.isOpen = !this.isOpen;
  }
}