import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operadora } from '@app/_models/VPP/Operadora';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  constructor(private http: HttpClient) { }

getAllOperadoras() {
  return this.http.get<Operadora[]>(`${environment.apiUrl}/api/Operadoras/`);
}

}
