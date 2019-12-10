import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiarioService } from '@app/_services/beneficiario.service';
import { Segurado } from '@app/_models/VPP/Segurado';
import { Vpp } from '@app/_models/VPP/vpp';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-Beneficiario',
  templateUrl: './Beneficiario.component.html',
  styleUrls: ['./Beneficiario.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BeneficiarioComponent implements OnInit {

  id: number;
  private sub: any;
  private beneficiario: Segurado
  private empresaBeneficiario: string;
  private operadoraBeneficiario: string;


  
  //tabela
  columnsToDisplay = ['Data solicitação', 'Carater','TipoProcedimento', 'UltimoStatus'];

  expandedElement: Vpp | null;  
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private beneficiarioService: BeneficiarioService
    ) { 
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
     });
    }

  ngOnInit() {   
    this.beneficiarioService.getBeneficiarioById(this.id).subscribe(
      ben => {
        this.beneficiario = ben;
        this.dataSource = new MatTableDataSource<Vpp>(this.beneficiario.vpp);
        this.dataSource.paginator = this.paginator;        
        this.dataSource.sort = this.sort;
        
        if(this.beneficiario)
          if(this.beneficiario.vpp)
            if(this.beneficiario.vpp[0].idEmpresaNavigation)
              this.empresaBeneficiario = this.beneficiario.vpp[0].idEmpresaNavigation.nomeFantasia
            if(this.beneficiario.vpp[0].idOperadoraNavigation)
              this.operadoraBeneficiario = this.beneficiario.vpp[0].idOperadoraNavigation.nome
        console.log(ben);
      }, err => {
        console.log(err);
      })
  }

}
