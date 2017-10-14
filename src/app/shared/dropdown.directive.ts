
import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector:'[appDropdown]'  
})
export class DropdownDirective {
   public text: String;
   constructor(private eRef: ElementRef){}
   
    @HostBinding ('class.open') isOpen = false;
  
    @HostListener('document:click', ['$event'])
      clickout(event) {
              // if(this.eRef.nativeElement.contains(event.target)) {
              //   this.text = "clicked inside";
              //   this.isOpen = !this.isOpen;
              // }
              if(this.eRef.nativeElement.contains(event.target)) {

                if((event.target as Element).id == "carretbutton"){

                  this.isOpen = !this.isOpen;
                } else {

                    if( this.isOpen){ this.isOpen = false};
                }
                if( this.isOpen){ this.isOpen = false};
              }
  }

}