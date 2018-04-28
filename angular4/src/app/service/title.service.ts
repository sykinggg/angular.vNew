import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {
  routerName: string;
  constructor() { }

  getTitle(): string {
      return this.routerName;
  }

  setTitle(newTitle: string) {
      this.routerName = newTitle;
  }
}
