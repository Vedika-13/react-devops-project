const { Builder, By, until } = require("selenium-webdriver");

(async function homePageTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000");

    await driver.wait(
      until.elementLocated(By.tagName("body")),
      5000
    );

    console.log("✅ Home page loaded successfully");
  } catch (error) {
    console.log("❌ Test failed", error);
  } finally {
    await driver.quit();
  }
})();
