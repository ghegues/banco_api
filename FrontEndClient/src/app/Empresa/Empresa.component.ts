import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empresas } from '@app/_models/VPP/Empresas';
import { EmpresaService } from '@app/_services/Empresa.service';

@Component({
  selector: 'app-Empresa',
  templateUrl: './Empresa.component.html',
  styleUrls: ['./Empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  Empresas: Empresas[] = []
  Empresa: Empresas
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
    ,private EmpresaService: EmpresaService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
    });
    this.getEmpresas();
  }

  get f() { return this.registerForm.controls; }
  getEmpresas(){
    this.EmpresaService.getAllEmpresas().subscribe(empresas => {
      this.Empresas = empresas;
    });
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 
    this.Empresa = Object.assign({}, this.registerForm.value)
    this.EmpresaService.postEmpresa(this.Empresa).subscribe(()=>{
      console.log("Deu certo");
      this.getEmpresas();
    });
   
    this.registerForm.reset();        
   }

}
