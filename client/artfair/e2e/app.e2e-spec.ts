import { ArtfairPage } from './app.po';

describe('artfair App', function() {
  let page: ArtfairPage;

  beforeEach(() => {
    page = new ArtfairPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
