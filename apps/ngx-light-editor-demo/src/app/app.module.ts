import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgxLightEditorModule } from 'ngx-light-editor';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxLightEditorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
