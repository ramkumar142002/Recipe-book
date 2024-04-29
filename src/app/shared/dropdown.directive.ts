import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') isOpen = false;


    //for clicking the element only
    
    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // }

    //For clicking anywhere in the document
    constructor(private elRef: ElementRef) {}
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
      
}