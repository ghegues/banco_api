import { Segurado } from './Segurado';
import { VppProcedimento } from './VppProcedimento';
import { Empresas } from './Empresas';
import { Operadora } from './Operadora';

export class Vpp {
    id: number;
    cdVpp: string;
    codEmpresa: string;
    dtSolicitacao: Date;
    dsIndicaProrrogacao: string;
    qtdSenhasSolicitadas: number;
    dsCaraterInternacao: string;
    idEmpresa:number;
    idOperadora:number;
    idSegurado:number;
    idPrestador:number;
    mensagem: string;
    motivoRecusa: string;
    idProfissional:number;
    dtValidadeVpp: Date;
    bloqueado: boolean;
    nuSolicitacao: string;
    idSeguradoNavigation: Segurado;
    vppProcedimentos: VppProcedimento[];
    idEmpresaNavigation: Empresas;    
    idOperadoraNavigation: Operadora;
    idUsuario: number;
    saving: boolean;
    daysToReturnToSelection: Date;
    finalizado: boolean

}
