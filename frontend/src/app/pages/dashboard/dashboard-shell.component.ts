import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from "@po-ui/ng-components";
import { AuthService } from "../../core/auth.service";
import { PO_UI_MODULES } from "../../shared/po-ui-imports";

@Component({
  selector: "app-dashboard-shell",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ...PO_UI_MODULES],
  templateUrl: "./dashboard-shell.component.html",
  styleUrls: ["./dashboard-shell.component.css"],
})
export class DashboardShellComponent {
  readonly menus: PoMenuItem[] = [
    { label: "Health", link: "/dashboard/health", icon: "po-icon-ok" },
    { label: "Admin", link: "/dashboard/admin", icon: "po-icon-user" },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get profile(): PoToolbarProfile {
    return {
      title: this.auth.userName,
      subtitle: this.auth.userEmail,
    };
  }

  get profileActions(): PoToolbarAction[] {
    return [
      {
        label: "Sair",
        action: () => this.logout(),
        type: "danger",
      },
    ];
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(["/login"]);
  }
}
