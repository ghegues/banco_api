import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Vpp } from '@app/_models/VPP/vpp';
import { StatusDetalhe } from '@app/_models/VPP/StatusDetalhe';
import { VppProcedimento } from '@app/_models/VPP/VppProcedimento';
import { Segurado } from '@app/_models/VPP/Segurado';

@Injectable({
  providedIn: 'root'
})
export class VppService {

  constructor(private http: HttpClient) { }

  getVppsByDate(dtInicio: string, dtFim: string) {
    return this.http.get<Vpp[]>(`${environment.apiUrl}/api/vpps`, {params: {'DtInicio': dtInicio, 'DtFim': dtFim}} );
  }

  getAllDetalhesStatus() {
    return this.http.get<StatusDetalhe[]>(`${environment.apiUrl}/api/vpps/getallstatusdetalhes`);
  }
  postStatus(statusId: number, idVpp: number){
    let _data = {statusId: statusId, idVpp: idVpp}
    return this.http.post(`${environment.apiUrl}/api/vpps/SaveStatus`, {data: _data})
  }
  postDaysToReturn(idVpp: number, daysToReturn: number){
    let _data = {idVpp: idVpp, daysToReturn: daysToReturn}
    return this.http.post(`${environment.apiUrl}/api/vpps/updateDaysVpp`, {data: _data})
  }
  postAtribuiEnfermeiro(idVpp:number, idUsuario: number){
    let _data = {idVpp: idVpp, idUsuario: idUsuario}
    return this.http.post(`${environment.apiUrl}/api/vpps/AtribuirVppToUsuario`, {data: _data})
  }
  postIncluirVppManual(vpp:Vpp, vppProcedimento: VppProcedimento, beneficiario: Segurado, Status: any){
    return this.http.post(`${environment.apiUrl}/api/vpps/`, {vpp: vpp, vppProcedimento: vppProcedimento, beneficiario: beneficiario, Status: Status })
  }

}
