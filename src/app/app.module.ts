import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { th_TH } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import th from '@angular/common/locales/th';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { HTTPInterceptor } from './config/http_interceptor';
import { NavbarComponent } from './share/navbar/navbar.component';
import { ProductModule } from './pages/product/product.module';
import { ReportModule } from './pages/report/report.module';
import { ModalMessageComponent } from './share/modal-message/modal-message.component';
import { SignupModule } from './pages/signup/signup.module';
registerLocaleData(th);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    NavbarComponent,
    ModalMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductModule,
    SignupModule,
    ReportModule,
    NzModalModule,
    NzIconModule,
    NzNotificationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NzSpinModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: th_TH },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
