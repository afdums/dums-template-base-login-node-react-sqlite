import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { API_URL } from "./api.config";
import { LoginPayload, RegisterPayload, Session } from "./models";

const STORAGE_KEY = "workspace.session";

@Injectable({ providedIn: "root" })
export class AuthService {
  private sessionSubject = new BehaviorSubject<Session | null>(
    this.loadSession()
  );

  readonly session$ = this.sessionSubject.asObservable();

  constructor(private http: HttpClient) {}

  get session(): Session | null {
    return this.sessionSubject.value;
  }

  get accessToken(): string {
    return this.session?.tokens?.accessToken ?? "";
  }

  get userName(): string {
    return this.session?.user?.name ?? "Usuario";
  }

  get userEmail(): string {
    return this.session?.user?.email ?? "";
  }

  get isLoggedIn(): boolean {
    return Boolean(this.accessToken);
  }

  login(payload: LoginPayload): Observable<Session> {
    return this.http
      .post<Session>(`${API_URL}/auth/login`, payload)
      .pipe(tap((session) => this.setSession(session)));
  }

  register(payload: RegisterPayload): Observable<Session> {
    return this.http.post<Session>(`${API_URL}/auth/register`, payload);
  }

  logout(): void {
    this.sessionSubject.next(null);
    this.clearStoredSession();
  }

  private setSession(session: Session | null): void {
    this.sessionSubject.next(session);
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      this.clearStoredSession();
    }
  }

  private clearStoredSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  private loadSession(): Session | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  }
}
