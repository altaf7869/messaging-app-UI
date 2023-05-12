import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './Components/chat/chat.component';
import { ChatInputComponent } from './Components/chat-input/chat-input.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { PrivateChatComponent } from './Components/private-chat/private-chat.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChatComponent,
    ChatInputComponent,
    MessagesComponent,
    PrivateChatComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
   MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    AppRoutingModule,
    HttpClientModule,
     BrowserAnimationsModule,
     MatFormFieldModule,
     FormsModule,
     ReactiveFormsModule,
     NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
