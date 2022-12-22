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

let emailStr = `kimalsam41@gmail.com`
let basePasswordStr = `Perfection1`
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
  this.retries(100);

  before(async () => {
  });

  after(async () => {
  });

  it(`can re-watch the video`, async () => {
    let inf = 1;

    let clickedTiles = [];

    async function rewatch() {

      await driver.get(youtubeUrl);
      let actions = driver.actions({ async: true });

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

      await driver.sleep(3000);

      actions = driver.actions({ async: true });
      await actions
        .keyDown(Key.TAB)
        .keyDown(Key.TAB)
        .keyDown(Key.TAB)
        .keyDown(Key.RIGHT)
        .keyDown(Key.ENTER)
        .perform();

      let tilesXpath = `//ytd-two-column-browse-results-renderer[@page-subtype="channels"]//div[@id="content"]`
      await driver.wait(until.elementLocated(By.xpath(tilesXpath)), defTimeout);
      await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(tilesXpath))), defTimeout);
      let tiles = await driver.findElements(By.xpath(tilesXpath));

      let randomTileNum = getRandomIntInclusive(1, tiles.length);
      let tile = tiles[randomTileNum];

      while (clickedTiles.includes(randomTileNum)) {
        clickedTiles.length === tiles.length ? clickedTiles = []:
        randomTileNum = (getRandomIntInclusive(1, tiles.length));
        tile = tiles[randomTileNum];
      }

      clickedTiles.push(randomTileNum);

      console.log(`clickedTiles `, clickedTiles);
      console.log(`randomTileNum `, randomTileNum);

      await actions.move({ origin: tile }).perform();
      await driver.sleep(1000);
      await tile.click();

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