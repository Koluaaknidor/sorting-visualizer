import { Component, ViewChild } from '@angular/core';
import { ArrayService } from './array.service';
import { StandardObjects } from './StandardObjects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends StandardObjects{
  constructor(protected arrayService: ArrayService) {super()}

  ngOnInit() {
    this.arrayService.generateRandomArray();
  }
}
