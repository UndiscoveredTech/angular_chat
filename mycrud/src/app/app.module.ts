import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { ProfileComponent } from './components/profile-component/profile-component.component';
import { MessageComponent } from './components/message/message.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EditorComponent,
    ProfileComponent,
    MessageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
