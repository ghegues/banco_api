import { Component, OnInit } from '@angular/core';
import { Procedimento } from '@app/_models/VPP/Procedimento';
import { ParametrizacaoProcedimentosService } from '@app/_services/parametrizacao-procedimentos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parametrizacao-procedimentos',
  templateUrl: './parametrizacao-procedimentos.component.html',
  styleUrls: ['./parametrizacao-procedimentos.component.css']
})
export class ParametrizacaoProcedimentosComponent implements OnInit {

  Procedimentos: Procedimento[];
  ProcedimentoForm: FormGroup;

  constructor(
    private ProcedimentoService: ParametrizacaoProcedimentosService
    ,private formBuilder: FormBuilder
    ) { }

  getAllProcedimentos(){
    this.ProcedimentoService.getAllProcedimentosIgnorados().subscribe(
      procs => {
        this.Procedimentos = procs;
      }
    )
  }

  get f() { return this.ProcedimentoForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.ProcedimentoForm.invalid) {
        return;
    } 
    let procedimento = this.ProcedimentoForm.get("Procedimento").value;    
    this.ProcedimentoService.ignorarProcedimentoByName(procedimento).subscribe(() => {
      this.getAllProcedimentos();
      this.ProcedimentoForm.reset();        
    });
}

  ngOnInit() {
    this.ProcedimentoForm = this.formBuilder.group({
      Procedimento: ['', Validators.required]
  });
    this.getAllProcedimentos();   
  }

  redefinirProcedimentoByName(nome: string){
    this.ProcedimentoService.redefineProcedimentoByName(nome).subscribe(()=>{
      this.getAllProcedimentos();
    })
  }
}
