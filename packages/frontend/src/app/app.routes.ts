import { Routes } from '@angular/router';
import { HeroListComponent } from './heroes-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { authGuard, stepUpGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'admin', component: AdminDashboardComponent, canActivate:[authGuard, stepUpGuard] },
    { path: 'heroes', component: HeroListComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
