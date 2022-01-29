import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionFormComponent} from './components/section-form/section-form.component';
import {SectionDetailComponent} from './components/section-detail/section-detail.component';
import {
  SectionDetailHeaderComponent
} from './components/section-detail/section-detail-header/section-detail-header.component';
import {GroupFormComponent} from './components/group-form/group-form.component';
import {GroupDetailComponent} from './components/group-detail/group-detail.component';
import {ModalComponent} from './shared/modal/modal.component';
import {SectionEmptyComponent} from './components/section-empty/section-empty.component';
import {SectionDeleteComponent} from './components/section-delete/section-delete.component';
import { GroupEmptyComponent } from './components/group-empty/group-empty.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { GroupDetailHeaderComponent } from './components/group-detail/group-detail-header/group-detail-header.component';
import { GroupDeleteComponent } from './components/group-delete/group-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SectionFormComponent,
    SectionDetailComponent,
    SectionDetailHeaderComponent,
    SectionEmptyComponent,
    GroupFormComponent,
    GroupDetailComponent,
    ModalComponent,
    SectionDeleteComponent,
    GroupEmptyComponent,
    AuthFormComponent,
    GroupDetailHeaderComponent,
    GroupDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
