import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Funcionario, DiasUteisPorMes } from '../models/main';
import { ListaFuncionarios } from '../listadedados/listafuncionarios';
import { Meses } from '../listadedados/diasuteis';

@Injectable()
export class MainService {

  constructor() { }

  getFuncionarios(): Observable<Funcionario[]> {
    return of (ListaFuncionarios);
  }

  getFuncionario(id: number): Observable<Funcionario> {
    // Todo: send the message _after_ fetching the hero
    return of(ListaFuncionarios.find(funcionario => funcionario.id === id));
  }

  getMeses(): Observable<DiasUteisPorMes[]> {
    return of(Meses);
  }

}
