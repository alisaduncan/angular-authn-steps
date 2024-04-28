import { Routes } from '@angular/router';
import { HeroListComponent } from './heroes-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

export const routes: Routes = [
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'heroes', component: HeroListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
