import { GradeCalcPage } from './app.po';

describe('grade-calc App', () => {
  let page: GradeCalcPage;

  beforeEach(() => {
    page = new GradeCalcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
