import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NaoDisponivel'
})
export class NaoDisponivelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value == '' || value == null)? "Não disponível":value;
  }

}
