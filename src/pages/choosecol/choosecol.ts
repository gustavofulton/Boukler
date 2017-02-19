import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { App } from 'ionic-angular';

import firebase from 'firebase';

import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Choosecol page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-choosecol',
  templateUrl: 'choosecol.html'
})
export class ChoosecolPage {

  user = firebase.auth().currentUser;

  schools: string[];
  private showList: boolean;

  constructor(private _app: App, public nav: NavController, private authData: AuthData) {
    this.showList = false;
    this.initializeItems();
  }

 initializeItems() {
   this.schools = [
      'Adrian College',
      'Albion College',
      'Alma College',
      'Andrews University',
      'Aquinas College',
      'Baker College',
      'Calvin College',
      'Central Michigan University',
      'Cleary College',
      'College for Creative Studies',
      'Concordia College-Ann Arbor',
      'Cornerstone University',
      'Davenport University',
      'Eastern Michigan University',
      'Ferris State University',
      'Finlandia University',
      'Grace Bible College',
      'Grand Valley State University',
      'Hillsdale College',
      'Hope College',
      'Kalamazoo College',
      'Kendall College of Art & Design',
      'Kettering University',
      'Lake Superior State University',
      'Lawrence Technological University',
      'Madonna University',
      'Marygrove College',
      'Michigan State University',
      'Michigan Technological University',
      'Northern Michigan University',
      'Northwood University',
      'Oakland University',
      'Olivet College',
      'Reformed Bible College',
      'Rochester College',
      'Saginaw Valley State University',
      'Saint Marys College',
      'Siena Heights University',
      'Spring Arbor University',
      'University of Detroit Mercy',
      'University of Michigan System',
      'Ann Arbor',
      'Dearborn',
      'Flint',
      'Walsh College',
      'Wayne State University',
      'Western Michigan University',
      'William Tyndale College',
   ];
 }
 getItems(ev: any) {
    this.showList = true;
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if (val == '') {
      this.showList = false;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.schools = this.schools.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  onCancel(ev) {
    // Show the results
    this.showList = false;

    // Reset the field
    ev.target.value = '';
  }
  schoolSelected(school) {
    let database = firebase.database().ref('/users').child(this.user.uid);
    database.update({school: school});
    // this._app.getRootNav().setRoot(TabsPage);
    this.nav.push(TabsPage);
  }

}
