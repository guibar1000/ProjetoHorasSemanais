import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Funcionario, DiasUteisPorMes } from '../models/main';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MainService {

  private funcionarioUrl = 'api/listafuncionarios';  // URL to web api
  private mesesUrl = 'api/meses';  // URL to web api

  constructor(private http: HttpClient, private messageService: ToastsManager) { }

  getFuncionarios(): Observable<Funcionario[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Funcionario[]>(this.funcionarioUrl).pipe(tap(listafuncionarios => this.log('Funcionarios Encontrados')), catchError(this.handleError('getHeroes', [])));
  }

  getFuncionario(id: number): Observable<Funcionario> {
    const url = `${this.funcionarioUrl}/${id}`;
    // tslint:disable-next-line:max-line-length
    return this.http.get<Funcionario>(url).pipe(tap(_ => this.log(`Funcionarios Encontrado id=${id}`)), catchError(this.handleError<Funcionario>(`getFuncionario id=${id}`)));
  }

  getMeses(): Observable<DiasUteisPorMes[]> {
    return this.http.get<DiasUteisPorMes[]>(this.mesesUrl).pipe(catchError(this.handleError('getMeses', [])));

  }

  getMes(id: number): Observable<DiasUteisPorMes> {
    const url = `${this.mesesUrl}/${id}`;
    // tslint:disable-next-line:max-line-length
    return this.http.get<DiasUteisPorMes>(url).pipe(catchError(this.handleError<DiasUteisPorMes>(`getMes id=${id}`)));
  }





  updateFuncionario (funcionario: Funcionario): Observable<any> {
    console.log(funcionario);
    return this.http.put(this.funcionarioUrl, funcionario, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${funcionario.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.info('HeroService: ' + message);
  }
}

