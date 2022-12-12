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
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
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

      await driver.get(youtubeUrl);
      const actions = driver.actions({ async: true });

      let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
      await actions.move({ origin: searchInput }).perform();
      await driver.sleep(1000);
      await searchInput.sendKeys('veselovka channel');

      let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
      await actions.move({ origin: searchButton }).perform();
      await driver.sleep(1000);
      await searchButton.click();

      let channel = await driver.wait(until.elementLocated(By.xpath(`//*[.='veselovka']/preceding::ytd-channel-name[@id='channel-title'][1]`)), defTimeout);
      await actions.move({ origin: channel }).perform();
      await driver.sleep(1000);
      await channel.click();

      let videos = await driver.wait(until.elementLocated(By.xpath(`(//tp-yt-paper-tab)[2]`)), defTimeout);
      await actions.move({ origin: videos }).perform();
      await driver.sleep(1000);
      await videos.click();

      let tileContainerXpath = `(//ytd-two-column-browse-results-renderer[@page-subtype="channels"]//div[@id="content"])[${getRandomIntInclusive(1, 17)}]`
      let tileContainer = await waitLV(By.xpath(tileContainerXpath), defTimeout);
      await actions.move({ origin: tileContainer }).perform();
      await driver.sleep(1000);
      await tileContainer.click();

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