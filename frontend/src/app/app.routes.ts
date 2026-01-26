import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";
import { LoginPageComponent } from "./pages/auth/login-page.component";
import { RegisterPageComponent } from "./pages/auth/register-page.component";
import { DashboardShellComponent } from "./pages/dashboard/dashboard-shell.component";
import { DashboardHomeComponent } from "./pages/dashboard/dashboard-home.component";
import { AdminUsersComponent } from "./pages/admin/admin-users.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  {
    path: "dashboard",
    component: DashboardShellComponent,
    canActivate: [authGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "health" },
      { path: "health", component: DashboardHomeComponent },
      { path: "admin", component: AdminUsersComponent },
    ],
  },
  { path: "**", redirectTo: "login" },
];
