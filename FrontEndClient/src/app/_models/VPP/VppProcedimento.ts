import { Vpp } from './vpp';
import { Operadora } from './Operadora';
import { Procedimento } from './Procedimento';

export class VppProcedimento {
    idVppProcedimento: number;
    idVpp: number;
    cdProcedimento: number;
    qtdProcedimento: number;
    procedimento:string;
    qtdDiaria: number;
    dtInclusao:Date;
    dtValidacao:Date;
    dtValidade:Date;
    tipoProcedimento: string;
    idProcedimentoGesto: number;
    dtLiberacao:Date;
    idVppNavigation: Vpp;
    idProcedimentoGestoNavigation: Procedimento
}
