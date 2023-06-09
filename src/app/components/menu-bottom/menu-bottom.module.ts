import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from './menu-bottom.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateMessageComponent } from 'src/app/share/validate-message/validate-message.component';
import { ValidateMessageModule } from 'src/app/share/validate-message/validate-message.module';


@NgModule({
  declarations: [
    MenuBottomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    TranslateModule,
    ValidateMessageModule
    
  ],
  exports: [
    MenuBottomComponent
  ]
})
export class MenuBottomModule { }
