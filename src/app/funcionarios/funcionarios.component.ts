import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Funcionario } from '../models/main';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  funcionariosContratados: Funcionario[];

  constructor(private service: MainService, private route: Router) {

  }

  ngOnInit() {
    this.getListFuncionario();
  }

  getListFuncionario() {
    this.service.getFuncionarios().subscribe(funcionarios => this.funcionariosContratados = funcionarios);
  }

  onSelect(funcionario: Funcionario) {
    this.route.navigate(['/detalhes/' + funcionario.id]);
  }

}
