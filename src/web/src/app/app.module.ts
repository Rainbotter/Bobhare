import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionFormComponent} from './components/section-form/section-form.component';
import {SectionDetailComponent} from './components/section-detail/section-detail.component';
import {
  SectionDetailHeaderComponent
} from './components/section-detail/section-detail-header/section-detail-header.component';
import {GroupFormComponent} from './components/group-form/group-form.component';
import {GroupDetailComponent} from './components/group-detail/group-detail.component';
import {ModalComponent} from './shared/modal/modal.component';
import { SectionEmptyComponent } from './components/section-empty/section-empty.component'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
