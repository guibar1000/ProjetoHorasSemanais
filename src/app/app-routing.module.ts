import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DetalhesfuncionariosComponent } from './funcionarios/detalhesfuncionarios/detalhesfuncionarios.component';
import { SobreComponent } from './sobre/sobre.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detalhes/:id', component: DetalhesfuncionariosComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'sobre', component: SobreComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
