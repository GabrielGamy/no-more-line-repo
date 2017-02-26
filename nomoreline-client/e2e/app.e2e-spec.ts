import { NomorelineClientPage } from './app.po';

describe('nomoreline-client App', function() {
  let page: NomorelineClientPage;

  beforeEach(() => {
    page = new NomorelineClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
