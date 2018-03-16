import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from '../../service/main.service';

import { Funcionario, DiasUteisPorMes } from '../../models/main';
import { Meses } from '../../listadedados/diasuteis';

@Component({
  selector: 'app-detalhesfuncionarios',
  templateUrl: './detalhesfuncionarios.component.html',
  styleUrls: ['./detalhesfuncionarios.component.css']
})
export class DetalhesfuncionariosComponent implements OnInit {

  @Input() detalheFuncionario: Funcionario;

  meses: DiasUteisPorMes[];

  constructor(private route: ActivatedRoute, private service: MainService, private location: Location) { }

  ngOnInit() {
    this.getFuncionario();
  }

  getFuncionario(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getFuncionario(id)
      .subscribe(funcionario => this.detalheFuncionario = funcionario);
  }

  goBack(): void {
    this.location.back();
  }

}
