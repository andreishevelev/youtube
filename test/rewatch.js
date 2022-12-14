import { expect } from "chai";
import { until, Builder, By, Key, Origin } from "selenium-webdriver";
import * as mongodb from '../Mongodb.js';
import { Options } from "selenium-webdriver/chrome.js";

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
let watchedTitles = [];

describe(`Can watch video again and again and ...`, function () {
  this.timeout(0);
  // this.retries(100);

  before(async () => {
  });

  after(async () => {
  });

  it(`can re-watch the video`, async () => {
    let videoTitles = await mongodb.findOneST("google", "videos");

    console.log(`videoTitles `, videoTitles);

    await driver.sleep(3000);

    videoTitles = videoTitles.document.videos;

    console.log(`videoTitles `, videoTitles);

    async function rewatch() {

      let titleNum = getRandomIntInclusive(0, videoTitles.length - 1);
      let videoTitle = videoTitles[titleNum];

      if (watchedTitles.includes(videoTitle)) { await rewatch() }
      if (!watchedTitles.includes(videoTitle)) { watchedTitles.push(videoTitle) }

      console.log(`watchedTitles`, watchedTitles);


      await driver.get(youtubeUrl);
      let actions = driver.actions({ async: true });

      let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
      await actions.move({ origin: searchInput }).perform();
      await driver.sleep(1000);
      await searchInput.sendKeys(`veselovka channel ${videoTitle}`);

      let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
      await actions.move({ origin: searchButton }).perform();
      await driver.sleep(1000);
      await searchButton.click();

      // click video title
      let firstWord = videoTitle[0];
      let resultTile = await driver.wait(until.elementLocated(By.xpath(`//div[@id='title-wrapper']//*[contains(text(), '${firstWord}')]`)), defTimeout);
      await actions.move({ origin: resultTile }).perform();
      await driver.sleep(1000);
      await resultTile.click();
      await driver.sleep(1000);

      // if add shown click skip button
      for (let i = 0; i < 2; i++) {
        console.log(`inside for loop skip add`);
        let adsXpath = `//img[@class='ytp-ad-image']`
        try {
          await driver.wait(until.elementLocated(By.xpath(adsXpath)), 2000);
          await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(adsXpath))), 1000);
        }
        catch (err) {
          console.log(`add not show`);
        }

        let adsImg = await driver.findElements(By.xpath(adsXpath));
        console.log(`adsImg.length `, adsImg.length);
        if (adsImg.length > 0) {
          let skipAds = await driver.findElements(By.xpath(`//button[.='Skip Ads' or .='Skip Ad']`), 10000);
          console.log(`skipAds`, skipAds.length);
          if (skipAds.length === 1) {
            console.log(`inside skipAds if`);
            await driver.wait(until.elementIsVisible(skipAds[0]), defTimeout);
            await skipAds[0].click();
          }
        }
      }

      // mouse over the video
      let video = await waitLV(By.xpath(`//video`), defTimeout);
      actions = driver.actions({ async: true });
      await actions.move({ origin: video }).perform();

      // set playback speed to 2x
      let settingsButton = await waitLV(By.xpath(`//button[@title='Settings']`), defTimeout);
      await settingsButton.click();
      await driver.sleep(700);
      let plSpeedButton = await waitLV(By.xpath(`//div[.='Playback speed']`), defTimeout);
      await plSpeedButton.click();
      await driver.sleep(800);
      let speed2x = await waitLV(By.xpath(`//div[@class='ytp-menuitem-label' and .='2']`), defTimeout);
      await speed2x.click();
      await settingsButton.click();
      await driver.sleep(1200);


      while (1 === 1) {
        // if video ends, then watch another one
        let adsXpath = `//img[@class='ytp-ad-image']`
        try {
          await driver.wait(until.elementLocated(By.xpath(adsXpath)), 2000);
          await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(adsXpath))), 1000);
        }
        catch (err) {
          console.log(`add not shown`);
        }
        let adsImg = await driver.findElements(By.xpath(adsXpath));

        let replayButtons = await driver.findElements(By.xpath(`//button[@title='Replay']`), defTimeout);
        console.log(`replayButtons`, replayButtons.length);
        
        if (replayButtons.length === 1 || adsImg.length > 0) {
          console.log(`inside rewatch if`);
          await rewatch();
        }

        await driver.sleep(700);
      }
    }

    await rewatch();

  });
});