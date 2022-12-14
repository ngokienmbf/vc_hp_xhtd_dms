import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { HttpClientInterceptor } from './Interceptor/http.client.interceptor';
import { RoleGuardService } from './Interceptor/rolo.guard.service'
import { ToastrModule } from 'ngx-toastr';
import { FormsModule  } from '@angular/forms';
import { AdminService } from './Service/admin.service';
import { ConfigService } from './Service/config.service';
import { OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { PopupComponent } from './View/popup/popup.component';
// import { ContInfoComponent } from './cont-info/cont-info.component';
// import { ContHistoryComponent } from './container/container-detail/cont-history/cont-history.component';
// import { ContImgsComponent } from './container/container-detail/cont-imgs/cont-imgs.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    // ContInfoComponent,
    // ContHistoryComponent,
    // ContImgsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AdminService,
    ConfigService,
    OAuthService,
    UrlHelperService,
    RoleGuardService,
    // OAuthLogger,
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
