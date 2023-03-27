import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import ProjectService from 'src/app/services/project.service';
import Utils from 'src/app/services/utils.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  type: string | null = '';
  get listProducts() {return Utils.coreData.listProducts}
  get reportFlag() {return Utils.coreData.reportFlag}
  constructor(private route:ActivatedRoute,  private modal:NzModalService,
    private translate: TranslateService, private api:ProjectService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      Utils.coreData.type = this.type;
      if(!this.type) {
        this.modal['error']({
          nzContent: this.translate.instant('ERROR.WRONG_TYPE')
        })
      }else{
        this.api.getProduct({type:this.type}).subscribe(res=> Utils.coreData.listProducts = res.data)
      }
    });
  }

  get getNameType() {
    switch(this.type){
      case 'order':
        return this.translate.instant('PRODUCTS')
      case 'bean':
        return this.translate.instant('GREEN BEANS')
      case 'coffee':
        return this.translate.instant('COFFEE')
    }
  }
}
