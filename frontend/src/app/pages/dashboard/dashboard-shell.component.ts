import { CommonModule } from "@angular/common";
import { Component, DestroyRef, NgZone, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from "@po-ui/ng-components";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
  private destroyRef = inject(DestroyRef);
  readonly menus: PoMenuItem[] = [
    { label: "Health", link: "/dashboard/health", icon: "po-icon-ok" },
    { label: "Admin", link: "/dashboard/admin", icon: "po-icon-user" },
  ];
  readonly profileActions: PoToolbarAction[] = [];
  profile: PoToolbarProfile = {
    title: "Usuario",
    subtitle: "",
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private zone: NgZone
  ) {
    this.profileActions.push({
      label: "Sair de todos dispositivos",
      action: this.logoutAll.bind(this),
      type: "danger",
    });

    this.profileActions.push({
      label: "Sair",
      action: this.logout.bind(this),
      type: "danger",
    });

    this.auth.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.profile = {
          title: this.auth.userName,
          subtitle: this.auth.userEmail,
        };
      });
  }

  logout(): void {
    this.auth.logout().subscribe(() => this.navigateToLogin());
  }

  logoutAll(): void {
    this.auth.logoutAll().subscribe(() => this.navigateToLogin());
  }

  private navigateToLogin(): void {
    this.zone.run(() => {
      void this.router.navigateByUrl("/login", { replaceUrl: true });
    });
  }
}
