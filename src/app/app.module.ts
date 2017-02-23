import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { SellPage } from '../pages/sell/sell';
import { SellDetailPage } from '../pages/sell-detail/sell-detail';
import { SellCreatePage } from '../pages/sell-create/sell-create';
import { BuyPage } from '../pages/buy/buy';
import { BuyDetailPage } from '../pages/buy-detail/buy-detail';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthData } from '../providers/auth-data';
import { ChoosecolPage } from '../pages/choosecol/choosecol'
import { MessagePage } from '../pages/message/message';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    SellPage,
    SellDetailPage,
    SellCreatePage,
    BuyPage,
    BuyDetailPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    ProfilePage,
    SettingsPage,
    ChoosecolPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    SellPage,
    SellDetailPage,
    SellCreatePage,
    BuyPage,
    BuyDetailPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    ProfilePage,
    SettingsPage,
    ChoosecolPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData]
})
export class AppModule {}
