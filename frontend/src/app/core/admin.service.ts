import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import { API_URL } from "./api.config";
import { User } from "./models";

@Injectable({ providedIn: "root" })
export class AdminService {
  constructor(private http: HttpClient) {}

  listUsers(accessToken: string) {
    const headers = this.buildHeaders(accessToken);
    return this.http
      .get<{ users: User[] }>(`${API_URL}/admin/users`, { headers })
      .pipe(map((response) => response?.users ?? []));
  }

  setUserActive(accessToken: string, userId: number, isActive: boolean) {
    const headers = this.buildHeaders(accessToken).set(
      "Content-Type",
      "application/json"
    );
    return this.http
      .patch<{ user: User }>(`${API_URL}/admin/users/${userId}/active`, {
        isActive,
      }, { headers })
      .pipe(map((response) => response?.user));
  }

  private buildHeaders(accessToken: string) {
    return new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
