
import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector:'[appDropdown]'  
})
export class DropdownDirective {
   public text: String;
   constructor(private eRef: ElementRef){}
   
    @HostBinding ('class.open') isOpen = false;
   //@HostBinding ('button:click') isOpen = false;
    
    // @HostListener ('document:click') toggleOpen2() {
    //    if( this.isOpen){ this.isOpen = false};
    //     }
    // @HostListener ('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    //     }
    @HostListener('document:click', ['$event'])
      clickout(event) {
              // if(this.eRef.nativeElement.contains(event.target)) {
              //   this.text = "clicked inside";
              //   this.isOpen = !this.isOpen;
              // }
              if(this.eRef.nativeElement.contains(event.target)) {
              console.log("clicked inside");
                if((event.target as Element).id == "carretbutton"){
                  console.log("clicked on carret");
                  this.isOpen = !this.isOpen;
                } else {
                  console.log("clicked inside In ELSE");
                    if( this.isOpen){ this.isOpen = false};
                }
              } else {
                console.log( "clicked outside");
                 if( this.isOpen){ this.isOpen = false};
              }
  }

}