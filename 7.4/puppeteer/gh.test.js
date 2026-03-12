let page;

jest.setTimeout(40000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
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
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 15000);
});

describe("Github other pages titles", () => {
 
  beforeEach(async () => {
    page = await browser.newPage();
  });

  test("The Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 20000);

  test("The Security page title", async () => {
    await page.goto("https://github.com/features/security");
    const title = await page.title();
    expect(title).toContain("Security");
  }, 20000);

  test("The Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 20000);
});




