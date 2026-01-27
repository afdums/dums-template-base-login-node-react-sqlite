import { Component } from "@angular/core";
import { PoNotificationService } from "@po-ui/ng-components";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private notification: PoNotificationService) {
    this.notification.setDefaultDuration(5000);
  }
}
