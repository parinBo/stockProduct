import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateMessageModule } from 'src/app/share/validate-message/validate-message.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    ValidateMessageModule
 
  ],
  exports:[
    SignupComponent
  ]
})
export class SignupModule { }
