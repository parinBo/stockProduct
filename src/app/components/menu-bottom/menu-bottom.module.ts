import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MenuBottomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    TranslateModule
    
  ],
  exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
