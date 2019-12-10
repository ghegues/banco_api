import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { SenhasDiariasComponent } from './SenhasDiarias/SenhasDiarias.component';


//Imports material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule, MatSortModule, MatNativeDateModule, MatSort, MatSelectModule} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormat.pipe';
import { NaoDisponivelPipe } from './_helpers/NaoDisponivel.pipe';
import { BeneficiarioComponent } from './Beneficiario/Beneficiario.component';


import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ParametrizacaoProcedimentosComponent } from './parametrizacao-procedimentos/parametrizacao-procedimentos.component';
import { EmpresaComponent } from './Empresa/Empresa.component';
import { VppManualComponent } from './vpp-manual/vpp-manual.component';


@NgModule({
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      appRoutingModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatSelectModule,
      MatTableModule,
      MatRadioModule,
      MatPaginatorModule,
      MatInputModule,
      MatSortModule,
      FormsModule,
      MatNativeDateModule,
      ModalModule.forRoot(),
      NgSelectModule
   ],
   declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      LoginComponent,
      SenhasDiariasComponent,
      DateTimeFormatPipePipe,
      NaoDisponivelPipe,
      BeneficiarioComponent,
      ParametrizacaoProcedimentosComponent,
      EmpresaComponent,
      VppManualComponent
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

   ],
   bootstrap: [
      AppComponent
   ],
   exports: [
      MatSortModule
   ],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ]
})

export class AppModule { }
