import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { TranslateModule } from '@ngx-translate/core';
import { MenuBottomModule } from 'src/app/components/menu-bottom/menu-bottom.module';


@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TranslateModule,
    MenuBottomModule
  ],
  exports:[
    ProductComponent
  ]
})
export class ProductModule { }
