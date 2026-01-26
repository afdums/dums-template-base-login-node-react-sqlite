import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { PoButtonType, PoNotificationService } from "@po-ui/ng-components";
import { AuthService } from "../../core/auth.service";
import { PO_UI_MODULES } from "../../shared/po-ui-imports";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PO_UI_MODULES],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  readonly submitType = PoButtonType.Submit;
  readonly form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  errorMessage = "";

  constructor(
    private auth: AuthService,
    private router: Router,
    private notification: PoNotificationService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      void this.router.navigate(["/dashboard"]);
    }
  }

  submit(): void {
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = "Informe um email e senha validos.";
      return;
    }

    this.isLoading = true;

    const raw = this.form.getRawValue();
    const email = raw.email ?? "";
    const password = raw.password ?? "";

    this.auth
      .login({ email, password })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (session) => {
          this.notification.success(`Bem-vindo, ${session.user?.name || ""}.`);
          void this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.error || "Nao foi possivel entrar.";
          this.notification.error(this.errorMessage);
        },
      });
  }

  goToRegister(): void {
    void this.router.navigate(["/register"]);
  }
}
