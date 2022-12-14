import { expect } from "chai";
import { until, Builder, By, Key, Origin } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";
import * as mongodb from '../Mongodb.js';

var options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

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

const channelName = `veselovka channel`

describe(`Can pull video names from Videos view`, function () {
  this.timeout(0);
  // this.retries(100);

  before(async () => {
  });

  after(async () => {
  });

  it(`can pull video names`, async () => {

    // await driver.get(youtubeUrl);
    // let actions = driver.actions({ async: true });

    // let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
    // await searchInput.sendKeys(channelName);

    // let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
    // await searchButton.click();

    // let channel = await driver.wait(until.elementLocated(By.xpath(`//*[.='veselovka']/preceding::ytd-channel-name[@id='channel-title'][1]`)), defTimeout);
    // await channel.click();

    // actions = driver.actions({ async: true });
    // await actions
    //   .keyDown(Key.TAB)
    //   .keyDown(Key.TAB)
    //   .keyDown(Key.TAB)
    //   .keyDown(Key.RIGHT)
    //   .keyDown(Key.ENTER)
    //   .perform();

    let tilesXpath = `//ytd-two-column-browse-results-renderer[@page-subtype="channels"]//div[@id="content"]//yt-formatted-string[@id="video-title"]`
    await driver.wait(until.elementLocated(By.xpath(tilesXpath)), defTimeout);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(tilesXpath))), defTimeout);
    let tiles = await driver.findElements(By.xpath(tilesXpath));

    for (let i = 0; i < tiles.length; i++) {
      let videoName = await tiles[i].getText();
      // console.log(`videoName `, videoName);
      await driver.sleep(1000);
      await mongodb.insertArray("google", "videos", videoName);
    }
  });

});