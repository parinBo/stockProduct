import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, map, switchMap } from 'rxjs';
import ProjectService from 'src/app/services/project.service';
import Utils from 'src/app/services/utils.service';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private fb:FormBuilder, private api: ProjectService){

  }
  icon = 'up';
  @ViewChild('box')box!: ElementRef;
  @ViewChild('btn')btn!: ElementRef;
  formGroup:FormGroup =  this.createForm();

  createForm(){
    return this.fb.group({
      sku:[''],
      productName:[''],
      import:[],
      export:[],
      type:['']
    })
  }
  toggle(){
    const eleBox = this.box.nativeElement as HTMLElement;
    const eleBtn = this.btn.nativeElement;
    eleBox.classList.toggle('show');
    eleBtn.classList.toggle('show');
    if(eleBox.classList.contains('show')){
      this.icon = 'up';
    }else{
      this.icon = 'down';
    }
  }

  onSave(){
    this.formGroup.controls['type'].setValue(Utils.coreData?.type);
    this.api.addProduct(this.formGroup.value).pipe(
      filter(val => val.status === 's'),
      switchMap(() => {
        return this.api.getProduct({type: Utils.coreData.type});
      })
    ).subscribe(res=>{
      if(res.status === 's') {
        Utils.getNoti(res.status, 'บันทึกสำเร็จ')
        Utils.coreData.reportFlag = false;
      }
      Utils.coreData.listProducts = res.data;
    })
  }
  
  onReport(){
    this.formGroup.controls['type'].setValue(Utils.coreData?.type);
    Utils.setLoading(true);
    this.api.getProduct({type: Utils.coreData.type, report:Utils.coreData.type}).subscribe(res=>{
      if(res.status === 's') {
        Utils.coreData.listProducts = res.data;
        Utils.coreData.reportFlag = true;
      }
    }, ()=>{},()=> Utils.setLoading(false))
  }
  

}
