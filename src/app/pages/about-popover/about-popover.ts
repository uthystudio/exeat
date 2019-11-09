import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close('https://yasobe.ru/na/exeat')">
        <ion-label>Donate Us</ion-label>
      </ion-item>
        <ion-item button (click)="close('https://vk.com/feironox5')">
        <ion-label>Gleb Kiva</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://vk.com/invader370')">
         <ion-label>Nikita Malakhov</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://github.com/GlebKiva/exeat')">
        <ion-label>GitHub Repo</ion-label>
      </ion-item>
      <ion-item button (click)="close('/support')">
        <ion-label>Support</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
