import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { AnimationController, Platform } from '@ionic/angular';
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('cardContainer', { read: ElementRef }) cardContainer: ElementRef;

  x: string;
  y: string;
  z: string;
  iconState: boolean
  iconPath: string
  squareB: any;
  deviceWidth: any;
  deviceHeight: any;
  expanded: boolean;


  constructor(private gyroscope: Gyroscope, private animationCtrl: AnimationController, platform: Platform) {
    this.x = '';
    this.y = '';
    this.z = '';
    this.iconState = false;
    this.iconPath = "assets/icons/heart_outline.svg";
    this.deviceWidth = 0;
    this.deviceHeight = 0;
    this.expanded = false;

    platform.ready().then(() => {
      this.deviceWidth = platform.width();
      this.deviceHeight = platform.height();
    });
  }

  options: AnimationOptions = {
    path: "assets/heart_pop.json",
    autoplay: false
  };

  ngOnInit() {
    let options: GyroscopeOptions = {
      frequency: 1000
    }
    // console.log("==>", this.gyroscope)
    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        // console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      })
      .catch()

    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
        // console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      });


  }

  onCardClick() {
    if (!this.expanded) {
      const expandedCard = this.animationCtrl.create()
        .addElement(document.getElementById('card-container'))
        .duration(150)
        .fromTo('height', '80%', `${this.deviceHeight}px`)
        .fromTo('width', '80%', `${this.deviceWidth}px`)
        .fromTo('transform', 'perspective(800px)', 'perspective(6.5cm)')
        .fromTo('margin', '10%', '0');

      const bottomText = this.animationCtrl.create()
        .addElement(document.getElementById('card-bottom-text'))
        .duration(150)
        .fromTo('display', 'none', 'flex');

      const bottomWrapper = this.animationCtrl.create()
        .addElement(document.getElementById('card-bottom-wrapper'))
        .duration(150)
        .fromTo('height', '50px', `120px`);

      const parent = this.animationCtrl.create()
        .duration(150)
        .addAnimation([expandedCard, bottomText, bottomWrapper]);

      this.expanded = !this.expanded;
      parent.play();
    } else {
      const collapsedCard = this.animationCtrl.create()
        .addElement(document.getElementById('card-container'))
        .duration(150)
        .fromTo('height', `${this.deviceHeight}px`, '80%')
        .fromTo('width', `${this.deviceWidth}px`, '80%')
        .fromTo('transform', 'perspective(6.5cm)', 'perspective(800px)')
        .fromTo('margin', '0', '10%');

      const bottomText = this.animationCtrl.create()
        .addElement(document.getElementById('card-bottom-text'))
        .duration(150)
        .fromTo('display', `flex`, 'none');

      const bottomWrapper = this.animationCtrl.create()
        .addElement(document.getElementById('card-bottom-wrapper'))
        .duration(150)
        .fromTo('height', `120px`, '50px');

      const parent = this.animationCtrl.create()
        .duration(150)
        .addAnimation([collapsedCard, bottomText, bottomWrapper]);

      this.expanded = !this.expanded;
      parent.play();
    }
  }

  onIconClick() {
    // console.log("adsfds==>", this.gyroscope)
    this.iconState = !this.iconState;

    this.iconPath = !this.iconState ? "assets/icons/heart_outline.svg" : "assets/icons/heart_filled.svg";

    this.options = {
      ...this.options,
      autoplay: true,
      loop: false
    };
  }




  start() {

    // let options: GyroscopeOptions = {
    //    frequency: 1000
    // }

    // this.gyroscope.getCurrent(options)
    //   .then((orientation: GyroscopeOrientation) => {
    //      console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
    //    })
    //   .catch()

    //   this.gyroscope.watch()
    //      .subscribe((orientation: GyroscopeOrientation) => {
    //         console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
    //      });
  }

}
