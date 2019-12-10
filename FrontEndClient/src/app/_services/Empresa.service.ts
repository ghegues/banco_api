import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Empresas } from '@app/_models/VPP/Empresas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }


getAllEmpresas() {
  return this.http.get<Empresas[]>(`${environment.apiUrl}/api/empresas/`);
}
postEmpresa(empresa: Empresas){ 
  return this.http.post(`${environment.apiUrl}/api/empresas`,  empresa)
}

}
