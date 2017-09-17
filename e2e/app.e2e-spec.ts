import { ICommercePage } from './app.po';

describe('i-commerce App', () => {
  let page: ICommercePage;

  beforeEach(() => {
    page = new ICommercePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
