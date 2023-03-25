import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  type: string | null = '';
  constructor(private route:ActivatedRoute,  private modal:NzModalService,
    private translate: TranslateService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      if(!this.type) {
        this.modal['error']({
          nzContent: this.translate.instant('ERROR.WRONG_TYPE')
        })
      }
    });
  }

  get getNameType() {
    switch(this.type){
      case 'order':
        return this.translate.instant('PRODUCTS')
        break;
      case 'bean':
        return this.translate.instant('GREEN BEANS')
        break;
      case 'coffee':
        return this.translate.instant('COFFEE')
        break;
    }
  }
}
