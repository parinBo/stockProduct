import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import ProjectService from 'src/app/services/project.service';
import Utils from 'src/app/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formGroup: FormGroup = this.createForm();
  formSubmitted = false;
  constructor(private fb: FormBuilder, private service: ProjectService,
     private modal: NzModalService, private translate:TranslateService){

  }
  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  validate(){
    this.formSubmitted = true;
    if(this.formGroup.controls['password'].value !== this.formGroup.controls['confirmPassword'].value) {
      this.formGroup.controls['password'].setErrors({passwordNotMatch: true})
      this.formGroup.controls['confirmPassword'].setErrors({passwordNotMatch: true})
    }

    return this.formGroup.valid;
  }

  signup() {
    if(this.validate()){
      Utils.setLoading(true);
      const data =this.formGroup.value;
      this.service.register(data).subscribe(res => {
        Utils.setLoading(false)
        if(res.status === 'e') {
          this.modal.error({
            nzTitle: 'Notice',
            nzContent: this.translate.instant('CODE.'+res.code),
          });
        }else {
          this.modal.success({
            nzTitle: 'Notice',
            nzContent: this.translate.instant('CODE.'+res.code),
          })
          this.formGroup.reset();
        }
       
      },error => {
        Utils.setLoading(false)
      })
    }
    


  }

}
