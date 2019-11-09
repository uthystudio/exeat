import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { Events, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Exeat',
      url: '/app/tabs/schedule',
      icon: 'document'
    },
    {
      title: 'Housemasters',
      url: '/app/tabs/speakers',
      icon: 'contacts'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    if (localStorage.getItem('dark') === null) {
      localStorage.setItem('dark', JSON.stringify(false));
    }
    this.dark = JSON.parse(localStorage.getItem('dark'));
    this.changeIconOnStart();
    this.changeIcon();
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
    this.saveTheme();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/exeat');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  changeIcon() {
    if (this._document.getElementById('appFavicon').getAttribute('href') === 'assets/img/appicon.png') {
      this._document.getElementById('appTheme').setAttribute('content', '#2cb36d');
      this._document.getElementById('appFavicon').setAttribute('href', 'assets/img/favicon.png');
    } else {
      this._document.getElementById('appFavicon').setAttribute('href', 'assets/img/appicon.png');
      this._document.getElementById('appTheme').setAttribute('content', '#1a8ed7');
    }
  }
  saveTheme() {
    localStorage.setItem('dark', JSON.stringify(this.dark));
  }
  changeIconOnStart() {
    if (this.dark === true) {
      this._document.getElementById('appTheme').setAttribute('content', '#2cb36d');
      this._document.getElementById('appFavicon').setAttribute('href', 'assets/img/favicon.png');
    } else {
      this._document.getElementById('appFavicon').setAttribute('href', 'assets/img/appicon.png');
      this._document.getElementById('appTheme').setAttribute('content', '#1a8ed7');
    }
  }
}
