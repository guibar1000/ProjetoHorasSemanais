import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DetalhesfuncionariosComponent } from './funcionarios/detalhesfuncionarios/detalhesfuncionarios.component';
import { MainService } from './service/main.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { SobreComponent } from './sobre/sobre.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    DetalhesfuncionariosComponent,
    SobreComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
