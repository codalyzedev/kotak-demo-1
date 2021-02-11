import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.scss'],
  host: {
    '(window:deviceorientation)': 'onDeviceOrientation($event)',
    '(window:resize)': 'initTilt()'
  }
})
export class CustomImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input('backgroundImageSrc') backgroundImageSrc: any;
  @Input('overlayImageSrc') overlayImageSrc: any;

}
