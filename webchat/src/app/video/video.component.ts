import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from "@angular/material/snack-bar";


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit, AfterViewInit  {
  @ViewChild('video') video: any;
  loading: any;
  predictions: any;
  frontCameraActive: any;
  spinnerValue = 100;

 
  constructor(private _snackBar: MatSnackBar, private router: Router) {     
    // router.events.subscribe((event) =>{
      
    // });
  }

  async ngOnInit() {
    this.loading = false;
    this.spinnerValue = 0;
    this.frontCameraActive = true;
    this.onTurnCamera(null);
  }
  
  async ngAfterViewInit() {    
  }  

  startCamera(constraints: any) {
  let vid: any;

  if (this.video && this.video.nativeElement) {
    vid = this.video.nativeElement;
  }
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
          this.showToastMessage(
          'camera not',
           'it was not possible to detect a camera on your device.',
           1000      
           );
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
  
   showToastMessage(title: any, message: any, duration: any) {
    // this._snackBar.open(title, message, 
    //   { duration: duration, direction: 'ltr', verticalPosition: 'top' });

      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: 1000,
        direction: 'ltr',
        verticalPosition: 'top' as MatSnackBarVerticalPosition
      });
  }
}

@Component({
  selector: 'snack-bar-component',
  template: '<span class="example-pizza-party">' +
              '{{message}}'+
            '</span>',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})

export class SnackbarComponent {
  title: any;
  message: any = 'Cannot open camera on the device';
  duration: any = 1000;
}