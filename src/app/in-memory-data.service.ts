import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const listafuncionarios = [
      // tslint:disable-next-line:max-line-length
      { id: 1, nome: 'Guilherme', diasTrabalhados: 0, horasJaTrabalhadas: 0, minutosJaTrabalhados: 0, horasPorDia: 8, horasTotais: '0', mediaHorasATrabalhar: 0, mediaHorasJaTrabalhadas: 0 },
      // tslint:disable-next-line:max-line-length
      { id: 2, nome: 'Roberto', diasTrabalhados: 0, horasJaTrabalhadas: 0, minutosJaTrabalhados: 0, horasPorDia: 8, horasTotais: '0', mediaHorasATrabalhar: 0, mediaHorasJaTrabalhadas: 0 },
      // tslint:disable-next-line:max-line-length
      { id: 3, nome: 'Karlos', diasTrabalhados: 0, horasJaTrabalhadas: 0, minutosJaTrabalhados: 0, horasPorDia: 8, horasTotais: '0', mediaHorasATrabalhar: 0, mediaHorasJaTrabalhadas: 0 }
    ];
    const meses = [
      // somente para o ano de 2018 - Inclui Feriados
      { id: 1, nome: 'Janeiro', diasUteis: 22 },
      { id: 2, nome: 'Fevereiro', diasUteis: 19 },
      { id: 3, nome: 'Março', diasUteis: 21 },
      { id: 4, nome: 'Abril', diasUteis: 21 },
      { id: 5, nome: 'Maio', diasUteis: 22 },
      { id: 6, nome: 'Junho', diasUteis: 21 },
      { id: 7, nome: 'Julho', diasUteis: 22 },
      { id: 8, nome: 'Agosto', diasUteis: 23 },
      { id: 9, nome: 'Setembro', diasUteis: 19 },
      { id: 10, nome: 'Outubro', diasUteis: 22 },
      { id: 11, nome: 'Novembro', diasUteis: 20 },
      { id: 12, nome: 'Dezembro', diasUteis: 20 }
    ];

    return { listafuncionarios, meses };
  }
}
