import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [MenuBottomComponent],
  imports: [
    CommonModule,
    NzIconModule,
    TranslateModule
    
  ],
  exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
