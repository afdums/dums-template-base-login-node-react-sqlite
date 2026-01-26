import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PoNotificationService, PoTagType } from "@po-ui/ng-components";
import { PO_UI_MODULES } from "../../shared/po-ui-imports";

@Component({
  selector: "app-dashboard-home",
  standalone: true,
  imports: [CommonModule, ...PO_UI_MODULES],
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.css"],
})
export class DashboardHomeComponent {
  readonly statusTagType = PoTagType.Info;

  constructor(private notification: PoNotificationService) {}

  showComingSoon(label: string): void {
    this.notification.information(`${label} em breve.`);
  }
}
