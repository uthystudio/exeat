import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  customDayShortNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }

  updateSchedule() {
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    await fab.close();
  }

  async submit() {
    // tslint:disable-next-line:max-line-length
    if (document.getElementById('name').innerText !== '' && document.getElementById('surname') !== null && document.getElementById('grade') !== null && document.getElementById('house') !== null && document.getElementById('deptime') !== null  && document.getElementById('depdate') !== null  && document.getElementById('arrdate') !== null  && document.getElementById('arrtime') !== null  && document.getElementById('parname') !== null && document.getElementById('email') !== null && document.getElementById('phone') !== null && document.getElementById('address') !== null && document.getElementById('transport') !== null && document.getElementById('reason') !== null) {
      const alert = await this.alertCtrl.create({
        header: 'We\' have sent an email with the verification link to your parent\'s email.',
        buttons: [
          'Ok'
        ]
      });
      await alert.present();
    }
  }
}
