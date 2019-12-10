import { Component, OnInit } from '@angular/core';
import { Empresas } from '@app/_models/VPP/Empresas';
import { Operadora } from '@app/_models/VPP/Operadora';
import { User } from '@app/_models';
import { StatusDetalhe } from '@app/_models/VPP/StatusDetalhe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '@app/_services/Empresa.service';
import { OperadoraService } from '@app/_services/Operadora.service';
import { UserService } from '@app/_services';
import { VppService } from '@app/_services/vpp.service';
import { Vpp } from '@app/_models/VPP/vpp';
import { Segurado } from '@app/_models/VPP/Segurado';
import { VppProcedimento } from '@app/_models/VPP/VppProcedimento';
import { Status } from '@app/_models/VPP/Status';
import { Procedimento } from '@app/_models/VPP/Procedimento';
import { ProcedimentoService } from '@app/_services/Procedimento.service';

@Component({
  selector: 'app-vpp-manual',
  templateUrl: './vpp-manual.component.html',
  styleUrls: ['./vpp-manual.component.css']
})
export class VppManualComponent implements OnInit {

  Empresas: Empresas[] = []
  Operadoras: Operadora[] = []
  Users: User[] = []
  Status: StatusDetalhe[] = []
  Procedimentos: Procedimento[] = []
  StatusUnico: StatusDetalhe = { finalizado: false, id: 0, nome: '' };

  registerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private operadoraService: OperadoraService,
    private usersService: UserService,
    private vppService: VppService,
    private procedimentoService: ProcedimentoService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      dtSolicitacao: ['', Validators.required],
      nmBeneficiario: ['', Validators.required],
      nmEmpresa: ['', Validators.required],
      nmOperadora: ['', Validators.required],
      nmTipoProcedimento: ['', Validators.required],
      nmProcedimento: ['', Validators.required],
      nmIdentificacao: ['', Validators.required],
      nmUsuario: ['', Validators.required],
      nmStatus: ['', Validators.required],
      DiasRetorno: [''],
      saving: ['']
    })

    this.empresaService.getAllEmpresas().subscribe(
      empresas => {
        this.Empresas = empresas;
      }
    )
    this.operadoraService.getAllOperadoras().subscribe(
      operadoras => {
        this.Operadoras = operadoras;
      }
    )
    this.usersService.getAll().subscribe(
      users => {
        this.Users = users;
      }
    )
    this.vppService.getAllDetalhesStatus().subscribe(
      statusDetalhes => {
        this.Status = statusDetalhes
      });
    
   
  }


  get f() { return this.registerForm.controls; }

  changeStatus(e) {
    this.StatusUnico = this.Status.find(x => x.id === parseInt(e.target.value));
  }

  onSubmit() {

    if (this.registerForm.valid) {
      debugger; 

      let vpp: Vpp = new Vpp();
      let beneficiario: Segurado = new Segurado();
      let vppProcedimento: VppProcedimento = new VppProcedimento();
      let status: Status = new Status();

      vpp.dtSolicitacao = this.registerForm.get('dtSolicitacao').value
      vpp.idEmpresa = this.registerForm.get('nmEmpresa').value
      vpp.idOperadora = this.registerForm.get('nmOperadora').value
      vpp.idUsuario = this.registerForm.get('nmUsuario').value
      vpp.daysToReturnToSelection = this.registerForm.get('DiasRetorno').value

      beneficiario.nmSegurado = this.registerForm.get('nmBeneficiario').value
      beneficiario.cdIdentificacao = this.registerForm.get('nmIdentificacao').value

      vppProcedimento.tipoProcedimento = this.registerForm.get('nmTipoProcedimento').value
      vppProcedimento.procedimento = this.registerForm.get('nmProcedimento').value

      status.StatusDetalheId = parseInt(this.registerForm.get('nmStatus').value);   

      this.vppService.postIncluirVppManual(vpp, vppProcedimento, beneficiario, status).subscribe(()=>{
        this.registerForm.reset();
      })
    }
  }
}
