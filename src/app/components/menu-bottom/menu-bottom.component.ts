import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent {
  icon = 'up';
  @ViewChild('box')box!: ElementRef;
  @ViewChild('btn')btn!: ElementRef;

  toggle(){
    const eleBox = this.box.nativeElement as HTMLElement;
    const eleBtn = this.btn.nativeElement;
    if(eleBox.classList.contains('show')){
      eleBox.classList.remove('show');
      eleBtn.classList.remove('show');
      this.icon = 'up';
    }else{
      eleBox.classList.add('show');
      eleBtn.classList.add('show');
      this.icon = 'down';
    }
  }
}
