import {AppConfig} from 'src/app/config/app.config';
import {HomePage} from './home-page';

describe('Home page', function () {
  let page;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should contains TBD content', () => {
    HomePage.navigateTo();
  });
});
