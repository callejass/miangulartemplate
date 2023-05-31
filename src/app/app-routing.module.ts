import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';



const appRoutes: Routes = [
  
  {
    path:'login',
    loadChildren:()=>import('./features/mi-auth/mi-auth.module').then(m=>m.MiAuthModule),

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
     canActivate:[AuthGuard]
  },
  {
    path: 'demo',
    loadChildren: () => import('./features/demo/demo.module').then(m => m.DemoModule),
     canActivate:[AdminGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate:[AuthGuard]
  },
  {
    path:'account',
    loadChildren:()=>import('./features/account/account.module').then(m=>m.AccountModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
