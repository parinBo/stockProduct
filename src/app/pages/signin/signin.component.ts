import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import ProjectService from 'src/app/services/project.service';
import Utils from 'src/app/services/utils.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  formGroup: FormGroup = this.createForm();
  constructor(private fb: FormBuilder, private service: ProjectService, private modal:NzModalService,
    private translate: TranslateService, private router:Router){

  }
  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: [''],
      password: [''],
    });
  }

  btnLoginOk(){
    Utils.setLoading(true);
    setTimeout(() => {
      Utils.setLoading(false);
      this.router.navigate(['/'])
    }, 1500);
  }


  signin() {
    Utils.setLoading(true);
    this.service.signin({
      username: this.formGroup.value.username, 
      password: this.formGroup.value.password
    }).subscribe(res => {
      if(res.status === 's') {
        this.modal.success({
          nzTitle: 'Notice',
          nzContent: this.translate.instant('CODE.signInPass'),
          nzClosable: false,
          nzOnOk: ()=> this.btnLoginOk()
        });
      }else {
        this.modal.error({
          nzTitle: 'Notice',
          nzContent: this.translate.instant(res.code),
          nzClosable: false,
          nzOkText: 'ok'
        });
      }
    },()=>{}, ()=> Utils.setLoading(false))

  }

}
