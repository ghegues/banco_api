import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Segurado } from '@app/_models/VPP/Segurado';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  constructor(private http: HttpClient) { }

  getBeneficiarioById(id:number){
    return this.http.get<Segurado>(`${environment.apiUrl}/api/beneficiario/${id}`)
  }
}
