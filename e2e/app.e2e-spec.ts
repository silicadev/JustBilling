import { JustBillingPage } from './app.po';

describe('just-billing App', function() {
  let page: JustBillingPage;

  beforeEach(() => {
    page = new JustBillingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
