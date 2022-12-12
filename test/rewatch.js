import { expect } from "chai";
import { until, Builder, By, Key, Origin } from "selenium-webdriver";
import Mongodb from "../Mongodb.js"
import { Options } from "selenium-webdriver/chrome.js";


let mongodb = new Mongodb();

var options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

// await driver.manage().window().maximize();

let defTimeout = 5000;

let emailStr = `sheveleva.oksana.34@gmail.com`
let basePasswordStr = `20LDFLWFNM`
let youtubeUrl = `https://www.youtube.com`

let waitLV = async (locator, timeout) => {
  await driver.wait(until.elementLocated(locator), timeout);
  let element = driver.wait(until.elementIsVisible(await driver.findElement(locator)), timeout);
  return element;
}



describe(`Can watch video again and again and ...`, function () {
  this.timeout(0);

  before(async () => {
    // await driver.get(youtubeUrl);
  });

  // afterEach("take screenshot on failure", async function () {
  //   if (this.currentTest.state !== "passed") {
  //     await driver.sleep(2000);
  //     return screenshot("screenshot on fail");
  //   }
  // });

  after(async () => {
    // await driver.sleep(5000);
    // console.log(`closing Browser`);
    // await driver.close();
    // await driver.quit();
  });

  it(`can re-watch the video`, async () => {
    let inf = 1;

 

    async function rewatch() {

      function getRandomIntInclusive() {
        let min = 300;
        let max = 900;
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      }
      
      async function type(text) {
        for (var i = 0; i < text.length; i++) {
          await driver.sendKeys(text[i]);
          delay(getRandomIntInclusive());
        }
      }

      await driver.get(youtubeUrl);
      const actions = driver.actions({ async: true });

      let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
      await actions.move({ origin: searchInput }).perform();
      await driver.sleep(1000);
      await searchInput.sendKeys('veselovka channel Как покрасить комод ikea своими руками используя малярный скотч');

      let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
      await actions.move({ origin: searchButton }).perform();
      await driver.sleep(1000);
      await searchButton.click();


      let firstVideo = await waitLV(By.xpath(`//yt-formatted-string[.="Как покрасить комод ikea своими руками используя малярный скотч"]`), defTimeout);
      await actions.move({ origin: firstVideo }).perform();
      await driver.sleep(1000);
      await firstVideo.click();

      while (inf === 1) {

        let timelineLocator = `//div[@class='ytp-timed-markers-container']`
        let timelineEl = await waitLV(By.xpath(timelineLocator), defTimeout);
        // let timelineEl = await driver.wait(until.elementLocated(By.xpath(timelineLocator)), defTimeout);
        // await driver.sleep(1000);
        const actions = driver.actions({ async: true });
        await actions.move({ origin: timelineEl }).perform();
        await actions.move({ x: 8, y: 0, origin: Origin.POINTER }).perform();
        await actions.move({ x: -8, y: 0, origin: Origin.POINTER }).perform();

        let durationLocator = `//span[@class='ytp-time-duration']`
        let durationEl = await driver.wait(until.elementLocated(By.xpath(durationLocator)), defTimeout);
        let duration = await durationEl.getText();

        let currentLocator = `//span[@class='ytp-time-current']`
        let currentEl = await driver.wait(until.elementLocated(By.xpath(currentLocator)), defTimeout);
        let current = await currentEl.getText();

        console.log(`current`, current);
        console.log(`duration`, duration);

        if (current === duration) {
          console.log(`inside if`);
          await rewatch();

        }
        await driver.sleep(500);
      }
    }

    await rewatch();

  });
});