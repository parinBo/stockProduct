import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMessageComponent } from './validate-message.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ValidateMessageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    ValidateMessageComponent
  ]
})
export class ValidateMessageModule { }
