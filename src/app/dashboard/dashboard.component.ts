import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';

import { Funcionario } from '../models/main';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  funcionariosContratados: Funcionario[];

  constructor(private service: MainService) { }

  ngOnInit() {
    this.getListFuncionario();
  }

  getListFuncionario() {
    this.service.getFuncionarios().subscribe(funcionarios => this.funcionariosContratados = funcionarios);
  }

}
