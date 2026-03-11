let page;

jest.setTimeout(40000);

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
   
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load" }), 
      firstLink.click(),
    ]);

    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 40000); 

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);

    expect(actual).toContain("Get started with Team");
  }, 15000);
});



