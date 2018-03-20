import { Component, OnInit, Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from '../../service/main.service';

import { Funcionario, DiasUteisPorMes } from '../../models/main';

@Component({
  selector: 'app-detalhesfuncionarios',
  templateUrl: './detalhesfuncionarios.component.html',
  styleUrls: ['./detalhesfuncionarios.component.css']
})
export class DetalhesfuncionariosComponent implements OnInit {

  @Input() detalheFuncionario: Funcionario;

  meses: DiasUteisPorMes[];
  mesSelecionado: DiasUteisPorMes;
  mes: DiasUteisPorMes;

  constructor(private route: ActivatedRoute, private service: MainService, private location: Location) {
    this.onOptionSelected(1);
  }

  ngOnInit() {
    this.getFuncionario();
    this.getMeses();
    this.service.getMes(1).subscribe((x) => {
      this.mesSelecionado = x;
    });
  }

  getMeses() {
    this.service.getMeses().subscribe(
      meses => this.meses = meses
    );
  }

  getFuncionario() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getFuncionario(id).subscribe(
      funcionario => this.detalheFuncionario = funcionario
    );
  }

  onOptionSelected(id) {
    this.service.getMes(id).subscribe((res) => {
      this.mes = res;
      console.log(this.mes);
    });
  }

  calculaHoras() {
    console.log(this.mesSelecionado);

    const hrsPorDia = parseFloat(this.detalheFuncionario.horasPorDia.toString());
    let hrJaTrab = parseFloat(this.detalheFuncionario.horasJaTrabalhadas.toString());
    let minJaTrab = parseFloat(this.detalheFuncionario.minutosJaTrabalhados.toString());
    const diasJaTrab = parseFloat(this.detalheFuncionario.diasTrabalhados.toString());
    const diasUteisDoMes = parseFloat(this.mes.diasUteis.toString());
    const mesDoCalculo = this.mes;

    let totHorasMes: number;
    let diasUteisDoMesRestantes: number;

    let minJaTrabTxt: string;

    // let totHrsTrab: number;


    const df: Funcionario = new Funcionario;

    totHorasMes = (hrsPorDia * diasUteisDoMes);
    diasUteisDoMesRestantes = (diasUteisDoMes - diasJaTrab);

    while (minJaTrab >= 60) {
      minJaTrab = minJaTrab - 60;
      hrJaTrab = hrJaTrab + 1;
    }

    // totHrsTrab = (totHorasMes - hrJaTrab);
    // console.log(totHrsTrab);
    console.log(hrJaTrab + 'hrs ' + minJaTrab + 'min de ' + totHorasMes + 'hrs (totais), pelo mês de ' + mesDoCalculo.nome + '.');

    this.detalheFuncionario.horasJaTrabalhadas = hrJaTrab;
    this.detalheFuncionario.minutosJaTrabalhados = minJaTrab;
    if (minJaTrab < 10) {
      minJaTrabTxt = '0' + minJaTrab;
      this.detalheFuncionario.horasTotais = hrJaTrab + ':' + minJaTrabTxt + ' / ' + totHorasMes;
    } else {
      this.detalheFuncionario.horasTotais = hrJaTrab + ':' + minJaTrab + ' / ' + totHorasMes;
    }
    this.detalheFuncionario.mediaHorasATrabalhar = Math.round((totHorasMes - hrJaTrab) / diasUteisDoMesRestantes);
    this.detalheFuncionario.mediaHorasJaTrabalhadas = Math.round(hrJaTrab / diasJaTrab);

    this.save();
  }

  save() {
    this.service.updateFuncionario(this.detalheFuncionario)
      .subscribe();
  }



  download(data: any, filename: string) {

  }


  // convert Json to CSV data
  ConvertToCSV(objArray: any) {
    // tslint:disable-next-line:triple-equals
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:forin
    for (const index in objArray[0]) {
        row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        // tslint:disable-next-line:forin
        for (const index in array[i]) {
            if (line !== '') { line += ','; }

            line += '"' + array[i][index] + '"';
        }

        str += line + '\r\n';
    }

    return str;
}


  exportCsv() {
    const data = [
      {
        id: this.detalheFuncionario.id,
        nome: this.detalheFuncionario.nome,
        diasTrabalhados: this.detalheFuncionario.diasTrabalhados,
        horasJaTrabalhadas: this.detalheFuncionario.horasJaTrabalhadas,
        minutosJaTrabalhados: this.detalheFuncionario.minutosJaTrabalhados,
        horasPorDia: this.detalheFuncionario.horasPorDia,
        horasTotais: this.detalheFuncionario.horasTotais,
        mediaHorasATrabalhar: this.detalheFuncionario.mediaHorasATrabalhar,
        mediaHorasJaTrabalhadas: this.detalheFuncionario.mediaHorasJaTrabalhadas,
        mes: this.mesSelecionado.nome,
        diasuteisdomes: this.mesSelecionado.diasUteis,
        horasMaximasPorMes: (this.detalheFuncionario.horasPorDia * this.mesSelecionado.diasUteis)
      },
    ];
    const filename = 'DetalheFuncionario2018';

    const csvData = this.ConvertToCSV(data);
    const a: any = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;

    const isIE = /*@cc_on!@*/false || !!(<any>document).documentMode;

    if (isIE) {
      const retVal = navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      a.download = filename + '.csv';
    }
    // If you will any error in a.download then dont worry about this.
    a.click();
  }

  goBack() {
    this.location.back();
  }
}
