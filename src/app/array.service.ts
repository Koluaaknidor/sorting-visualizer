import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  arraySize = 60;
  sortingSpeed = 60;
  sortingInProgress = false;
  array: number[] = [];

  generateRandomArray(): void {
    // if (this.sortingInProgress) {
    //   console.log('Sorting already in progress!');
    //   return;
    // }
    this.array = [];
    for (let i = 0; i < (this.arraySize + 5) * 2; i++) {
      this.array.push(this.randomIntFromInterval(5, 100));
    }
  }

  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async bubleSort() {
    // if (this.sortingInProgress) {
    //   console.log('Sorting already in progress!');
    //   return;
    // }
    this.sortingInProgress = true;

    if (this.array.length < 2) return; //Possible bug, because not setting flag to false in the end
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 1; i < this.array.length; i++) {
        if (this.array[i] < this.array[i - 1]) {
          changed = true;
          let temp = this.array[i];
          this.array[i] = this.array[i - 1];
          this.array[i - 1] = temp;
          await this.timer();
        }
      }
    }
    this.sortingInProgress = false;
  }

  async mergeSort() {
    this.sortingInProgress = true;
    await this.mergeSortInternal(0, this.array.length - 1);
    this.sortingInProgress = false;
  }

  async mergeSortInternal(l: number, r: number) {
    if (l == r) return;
    let m = l + Math.floor((r - l) / 2);
    await this.mergeSortInternal(l, m);
    await this.mergeSortInternal(m + 1, r);
    await this.merge(l, r, m);
  }

  async merge(l: number, r: number, m: number) {
    let lCopy = [];
    let rCopy = [];
    for (let i = l; i <= m; i++) {
      lCopy.push(this.array[i]);
    }
    for (let i = m + 1; i <= r; i++) {
      rCopy.push(this.array[i]);
    }

    let lCopyIdx = 0;
    let rCopyIdx = 0;
    for (let i = l; i <= r; i++) {
      if (lCopyIdx == lCopy.length) {
        this.array[i] = rCopy[rCopyIdx];
        rCopyIdx++;
        continue;
      } else if (rCopyIdx == rCopy.length) {
        this.array[i] = lCopy[lCopyIdx];
        lCopyIdx++;
        continue;
      }
      if (lCopy[lCopyIdx] < rCopy[rCopyIdx]) {
        this.array[i] = lCopy[lCopyIdx];
        lCopyIdx++;
        await this.timer();
      } else {
        this.array[i] = rCopy[rCopyIdx];
        rCopyIdx++;
        await this.timer();
      }
    }
  }

  private timer() {
    return new Promise((resolve) => setTimeout(()=>{resolve(0)}, 500 - (5 * this.sortingSpeed)));
  }
}
