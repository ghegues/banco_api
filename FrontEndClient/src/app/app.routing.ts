import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { SenhasDiariasComponent } from './SenhasDiarias/SenhasDiarias.component';
import { BeneficiarioComponent } from './Beneficiario/Beneficiario.component';
import { ParametrizacaoProcedimentosComponent } from './parametrizacao-procedimentos/parametrizacao-procedimentos.component';
import { EmpresaComponent } from './Empresa/Empresa.component';
import { VppManualComponent } from './vpp-manual/vpp-manual.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'SenhasDiarias',
        component: SenhasDiariasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'vpp-manual',
        component: VppManualComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Empresas',
        component: EmpresaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'parametrizacao-procedimentos',
        component: ParametrizacaoProcedimentosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'beneficiario/:id',
        component: BeneficiarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);