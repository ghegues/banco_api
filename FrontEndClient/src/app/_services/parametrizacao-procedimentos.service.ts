import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Procedimento } from '@app/_models/VPP/Procedimento';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametrizacaoProcedimentosService {

  constructor(private http: HttpClient) { }

  getAllProcedimentosIgnorados(){
    return this.http.get<Procedimento[]>(`${environment.apiUrl}/api/procedimento/GetAllProcedimentosIgnorados`)
  }
  ignorarProcedimentoByName(name: string){
    let _data = {"nome": name}
    return this.http.post(`${environment.apiUrl}/api/procedimento/IgnorarProcedimentoByName`, {data: _data})
  }
  redefineProcedimentoByName(name: string){
    let _data = {"nome": name}
    return this.http.post(`${environment.apiUrl}/api/procedimento/redefinirProcedimentoByName`, {data: _data})
  }

}
