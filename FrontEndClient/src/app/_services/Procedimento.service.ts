import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Procedimento } from '@app/_models/VPP/Procedimento';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {

  constructor(private http: HttpClient) { }

  getProcedimentos(){
    return this.http.get<Procedimento[]>(`${environment.apiUrl}/api/procedimento/`)
  }

}
