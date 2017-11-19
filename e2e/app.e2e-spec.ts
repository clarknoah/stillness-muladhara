import { StillnessMuladharaPage } from './app.po';

describe('stillness-muladhara App', function() {
  let page: StillnessMuladharaPage;

  beforeEach(() => {
    page = new StillnessMuladharaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
