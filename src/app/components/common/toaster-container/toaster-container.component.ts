import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
// import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.css']
})
export class ToasterContainerComponent implements OnInit {
  @Input('toast') toast: any;
  public objectToast: Toast;

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 5000,
      animation: 'fade',
      mouseoverTimerStop: true,
    });

  ngOnInit() {
    this.toast.subscribe((data: Toast) => {
      this.objectToast = data;
      this.toasterService.pop(this.objectToast);
    });
  }

}
