import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  @ViewChild('video') video: ElementRef | undefined;
  loading: boolean | undefined;
  predictions: any;
  frontCameraActive: any;
  spinnerValue = 100;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
    });
  }

  async ngOnInit() {
    this.loading = false;
    this.spinnerValue = 0;
    this.frontCameraActive = true;
    this.onTurnCamera(null);
  }

  startCamera(constraints: any) {
    const vid = this.video.nativeElement;

    if (!constraints) {
      constraints = true;
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: false, video: constraints })
        .then((stream) => {
          vid.srcObject = stream;

        })
        .catch((err0r) => {
          console.log('Something went wrong!');
        });
    }
  }

  onTurnCamera(event: any): void {
    let constraints = null;
    if (this.frontCameraActive) {
      constraints = {
        advanced: [{
          facingMode: 'environment'
        }]
      };
    }
    this.frontCameraActive = !this.frontCameraActive;
    this.startCamera(constraints);
  }
}
