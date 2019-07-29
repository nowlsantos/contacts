import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainEntryRoutingModule } from './main-entry-routing.module';

import { MainEntryComponent } from './main-entry.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        MainEntryComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        MainEntryRoutingModule
    ],
    exports: [MainEntryComponent],
})
export class MainEntryModule { }
