import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from "@po-ui/ng-components";
import { AdminService } from "../../core/admin.service";
import { AuthService } from "../../core/auth.service";
import { User } from "../../core/models";
import { PO_UI_MODULES } from "../../shared/po-ui-imports";

@Component({
  selector: "app-admin-users",
  standalone: true,
  imports: [CommonModule, ...PO_UI_MODULES],
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.css"],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  errorMessage = "";

  readonly columns: PoTableColumn[] = [
    { property: "name", label: "Usuario" },
    { property: "email", label: "Email" },
    { property: "role", label: "Role" },
    {
      property: "isActive",
      label: "Status",
      type: "boolean",
      boolean: { trueLabel: "Ativo", falseLabel: "Inativo" },
    },
  ];

  readonly actions: PoTableAction[] = [
    {
      label: "Ativar",
      action: (row: User) => this.toggleUser(row, true),
      visible: (row: User) => !row.isActive,
    },
    {
      label: "Desativar",
      action: (row: User) => this.toggleUser(row, false),
      type: "danger",
      visible: (row: User) => row.isActive,
    },
  ];

  readonly pageActions: PoPageAction[] = [
    {
      label: "Atualizar lista",
      icon: "po-icon-refresh",
      action: () => this.loadUsers(),
    },
  ];

  get totalUsersLabel(): string {
    return String(this.users.length);
  }

  get activeUsersLabel(): string {
    return String(this.users.filter((user) => user.isActive).length);
  }

  get inactiveUsersLabel(): string {
    return String(this.users.filter((user) => !user.isActive).length);
  }

  constructor(
    private admin: AdminService,
    private auth: AuthService,
    private notification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const token = this.auth.accessToken;
    if (!token) {
      this.errorMessage = "Token nao encontrado. Faca login novamente.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    this.admin.listUsers(token).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error || "Nao foi possivel carregar usuarios.";
        this.notification.error(this.errorMessage);
        this.isLoading = false;
      },
    });
  }

  toggleUser(user: User, isActive: boolean): void {
    if (!user) return;
    const token = this.auth.accessToken;
    if (!token) {
      this.errorMessage = "Token nao encontrado. Faca login novamente.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    this.admin.setUserActive(token, user.id, isActive).subscribe({
      next: (updated) => {
        if (!updated) {
          this.isLoading = false;
          return;
        }
        this.users = this.users.map((item) =>
          item.id === updated.id ? updated : item
        );
        this.notification.success("Usuario atualizado.");
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error || "Nao foi possivel atualizar o usuario.";
        this.notification.error(this.errorMessage);
        this.isLoading = false;
      },
    });
  }
}
