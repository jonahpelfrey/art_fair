import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistTableComponent } from './artist-table/artist-table.component';

import { DataService } from './data.service';
import { ArtistInterceptor } from './artist.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArtistFormComponent,
    ArtistTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ArtistInterceptor,
    multi: true
  }, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
