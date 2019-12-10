import { Vpp } from './vpp';

export class Segurado {
    id:number;
    cdIdentificacao: string;
    nmSegurado: string;
    idBeneficiario: number;
    dtAtualizacao: Date;
    vpp: Vpp[]
}
