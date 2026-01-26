import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { PoButtonType, PoNotificationService } from "@po-ui/ng-components";
import { AuthService } from "../../core/auth.service";
import { PO_UI_MODULES } from "../../shared/po-ui-imports";

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PO_UI_MODULES],
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  readonly submitType = PoButtonType.Submit;
  readonly form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  errorMessage = "";
  private redirectTimer?: number;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notification: PoNotificationService
  ) {}

  ngOnDestroy(): void {
    if (this.redirectTimer) {
      window.clearTimeout(this.redirectTimer);
    }
  }

  submit(): void {
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage =
        "Preencha nome, email valido e senha com minimo 6 caracteres.";
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMessage = "As senhas nao conferem.";
      return;
    }

    this.isLoading = true;

    const raw = this.form.getRawValue();
    const name = raw.name ?? "";
    const email = raw.email ?? "";
    const password = raw.password ?? "";

    this.auth
      .register({ name, email, password })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (session) => {
          this.notification.success(
            `Usuario criado. Bem-vindo, ${session.user?.name || ""}.`
          );
          this.form.reset();
          this.redirectTimer = window.setTimeout(() => {
            void this.router.navigate(["/login"]);
          }, 1400);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.error || "Nao foi possivel cadastrar.";
          this.notification.error(this.errorMessage);
        },
      });
  }

  goToLogin(): void {
    void this.router.navigate(["/login"]);
  }
}
