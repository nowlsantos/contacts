import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { InterceptorProviders } from './core/interceptors';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './create/add-contact.component';
/* import { LoaderComponent } from './loader/loader.component'; */

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ContactComponent,
        AddContactComponent,
        /* LoaderComponent */
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule
    ],
    providers: [InterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
