import {browser, by, element} from 'protractor';

export class HomePage {
  static navigateTo(): any {
    return browser.get('/');
  }
}
