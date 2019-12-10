import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@app/_models';
import { VppService } from '@app/_services/vpp.service';
import { Vpp } from '@app/_models/VPP/vpp';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusDetalhe } from '@app/_models/VPP/StatusDetalhe';
import { BsModalService } from 'ngx-bootstrap';
import { UserService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-SenhasDiarias',
  templateUrl: './SenhasDiarias.component.html',
  styleUrls: ['./SenhasDiarias.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SenhasDiariasComponent implements OnInit {

  vpp: Vpp;
  vpps: Vpp[] = []
  filter_vpps: Vpp[] = []
  StatusDetalhe: StatusDetalhe[] = []
  Detalhe: StatusDetalhe = {finalizado: false, id: 0, nome: ''};

  //fields
  filterForm: FormGroup;
  filterDate: FormGroup;  
  DaysForm: FormGroup;
  
  //tabela
  columnsToDisplay = ['Data solicitação','Empresa', 'Beneficiario','Carater', 'TipoProcedimento', 'Status', 'Enfermeiro'];
  expandedElement: Vpp | null;  
  dataSource = new MatTableDataSource();

  users: User[] = [];
  currentUser: User;
  
  dtFimString: string = new Date().toISOString().substr(0,10)  
  dtInicioDt = new Date().setDate(new Date().getDate() - 7)
  dtInicioString: string = new Date(this.dtInicioDt).toISOString().substr(0,10)  
  isCheckedMostraVpps: boolean = true;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  getUsers(){
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;  
    });
}
  
  constructor(
    private vppService: VppService
  , private fb: FormBuilder
  , private modalService: BsModalService
  , private userService: UserService
  , private authenticationService: AuthenticationService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
    }  

  
  ngOnInit() {
    this.filterForm = this.fb.group({
      Empresa:[''],
      Beneficiario:[''],
      Procedimento:['']
    })
    this.filterDate = this.fb.group({
      dtInicio:[this.dtInicioString, Validators.required],
      dtFim:[this.dtFimString, Validators.required]
    })

    this.DaysForm = this.fb.group({
      DaysToReturn:['']
    }) 
    this.getVpps();
    this.getUsers();
  }

  getVpps(){
    this.vppService.getVppsByDate(this.dtInicioString, this.dtFimString).subscribe(
      vpps => {
        this.vpps = vpps
        this.vpps = this.vpps.map(function(vpp){
          /* Essa parte é para criar um novo atributo no objecto da vpp procedimento, para
          que ele não se repita no front */
          vpp["procedimento_vpp"] = new Set(vpp.vppProcedimentos.map(function(el){ 
            return el.tipoProcedimento}))
            return vpp 
          })
        this.vppService.getAllDetalhesStatus().subscribe(
          statusDetalhes => {
            this.StatusDetalhe = statusDetalhes
            if(this.isCheckedMostraVpps){
              this.dataSource = new MatTableDataSource<Vpp>(this.vpps.filter((f) => {
                return f.idUsuario == null || f.idUsuario == this.currentUser.id }));
            }else{
              this.dataSource = new MatTableDataSource<Vpp>(this.vpps);
            }
            
            this.dataSource.paginator = this.paginator;        
            this.dataSource.sort = this.sort;
          });
      });
  }

  applyFilter(filterValue: string, target: string) {
    let _vpps: Vpp[]
    if(this.vpps.length > 0)
    {
      if(this.filter_vpps.length > 0)
        _vpps = this.filter_vpps
      else
        _vpps = this.vpps

      if(target === 'empresa')    
        this.filter_vpps = _vpps.filter(temp => {
          if(temp.idEmpresaNavigation !== undefined && temp.idEmpresaNavigation !== null)
            return temp.idEmpresaNavigation.razaoSocial.toLowerCase().includes(filterValue.toLowerCase())
        });
      if(target === 'beneficiario')
        this.filter_vpps = _vpps.filter(temp => {
          if(temp.idSeguradoNavigation !== undefined && temp.idSeguradoNavigation !== null)
            return temp.idSeguradoNavigation.nmSegurado.toLowerCase().includes(filterValue.toLowerCase())
      });

      if(target === 'procedimento')
        this.filter_vpps = _vpps.filter(temp => {
          if(temp.vppProcedimentos !== undefined && temp.vppProcedimentos.length > 0){
            return 'eu não lembro mais o que é para retornar, então coloco essa frase triste para me sentir triste também né.'

          }
        });

      if(this.filter_vpps.length > 0)    
        this.dataSource = new MatTableDataSource<Vpp>(this.filter_vpps);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    }   
  }

  limparFiltros(){
    this.filterForm.reset();
    this.dataSource = new MatTableDataSource<Vpp>(this.vpps);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    this.filter_vpps = []
  }

  changeStatus(e,  template: any, id_vpp){  
    this.DaysForm.reset()
    this.Detalhe = this.StatusDetalhe.find(x=> x.id === parseInt(e.target.value));    
    this.vpp = this.vpps.find(x=> x.id === id_vpp)
    template.show()
  }

  changeEnfermeiro(e, id_vpp){  
    let idUsuario = parseInt(e.target.value); 
    let idVpp = this.vpps.find(x=> x.id === id_vpp).id;
    this.vppService.postAtribuiEnfermeiro(idVpp, idUsuario).subscribe(
      succ => {
        console.log("Sucesso ao atribuir VPP para usuário")
      }
    )
  }


  salvar(template: any){
    this.vppService.postStatus(this.Detalhe.id, this.vpp.id).subscribe(
      succ => {
        if(!this.Detalhe.finalizado){
          this.vppService.postDaysToReturn(this.vpp.id, this.DaysForm.get('DaysToReturn').value).subscribe( succ2 => {            
          });
        }
      })
      template.hide()
  }

  pesquisarPorData(){
    this.dtInicioString = this.filterDate.get('dtInicio').value
    this.dtFimString = this.filterDate.get('dtFim').value
    if(this.filterDate.valid){
      this.getVpps();
    }
  }
  checkValueVpp(status: boolean){   
    this.isCheckedMostraVpps = status
    if(this.isCheckedMostraVpps){
      this.dataSource = new MatTableDataSource<Vpp>(this.vpps.filter((f) => {
        return f.idUsuario == null || f.idUsuario == this.currentUser.id }));
    }else{
      this.dataSource = new MatTableDataSource<Vpp>(this.vpps);
    }
  }
}
