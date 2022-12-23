import { expect } from "chai";
import { until, Builder, By, Key, Origin } from "selenium-webdriver";
import * as mongodb from '../Mongodb.js';
import { Options } from "selenium-webdriver/chrome.js";

var options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

let defTimeout = 10000;
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
let videoTitles = await mongodb.findOneST("google", "videos");
videoTitles = videoTitles.document.videos;

async function rewatch() {

  let titleNum = getRandomIntInclusive(0, videoTitles.length - 1);
  let videoTitle = videoTitles[titleNum];

  if (watchedTitles.length === videoTitles.length) { watchedTitles = [] } // TODO Log out, break
  if (watchedTitles.includes(videoTitle)) { await rewatch() }

  // open youtube.com
  console.log(`open youtube.com`);
  await driver.get(youtubeUrl);

  // enter video name to the search input
  console.log(`enter video name to the search input`);
  let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
  await searchInput.sendKeys(`veselovka channel ${videoTitle}`);

  // click search button
  console.log(`click search button`);
  let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
  await searchButton.click();

  async function clickVideoTitle(){
    console.log(`click video title`);
    let videoTileArr = videoTitle.split(' ')
    let firstWord = videoTileArr[0];
    let resultTile = await waitLV(By.xpath(`//div[@id='title-wrapper']//*[contains(text(), '${firstWord}')]//preceding::a[1] | //a[contains(text(), '${firstWord}')]`), defTimeout);
    await resultTile.click();
  }
  // click video title
  try {
    clickVideoTitle()

  }
  catch (err) {
    if (err.name == 'ElementNotInteractableError') {
      console.log(`ElementNotInteractableError error`, err);
      console.log(`click video tile second attemt after 5000 wait`, err);
      await driver.sleep(5000);
      clickVideoTitle()
    } else {
      console.log(`click video tile else error`, err);
    }
  }

  // if add shown click skip button
  for (let i = 0; i < 2; i++) {
    console.log(`inside for loop skip add`);
    let adsXpath = `//img[@class='ytp-ad-image' or @class='ytp-ads-image']`
    try {
      await driver.wait(until.elementLocated(By.xpath(adsXpath)), 2000);
      await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(adsXpath))), 1000);
    }
    catch (err) {
      console.log(`add is not show`);
    }

    let adsImg = await driver.findElements(By.xpath(adsXpath));
    console.log(`adsImg.length `, adsImg.length);
    if (adsImg.length > 0) {
      let skipAdsXpath = `//button[.='Skip Ads' or .='Skip Ad']`
      try {
        await driver.wait(until.elementLocated(By.xpath(skipAdsXpath)), 6000);
        await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(skipAdsXpath))), 1000);
      }
      catch (err) {
        console.log(`skip add/s is not show`);
      }
      let skipAds = await driver.findElements(By.xpath(skipAdsXpath));
      console.log(`skipAds`, skipAds.length);
      if (skipAds.length === 1) {
        console.log(`inside skipAds if`);
        await driver.wait(until.elementIsVisible(skipAds[0]), defTimeout);
        await skipAds[0].click();
      }
    }
  }

  // add current video to the array with watched videos
  if (!watchedTitles.includes(videoTitle)) { watchedTitles.push(videoTitle) }
  console.log(`watchedTitles`, watchedTitles);

  while (1 === 1) {
    // if video ends, then watch another one
    let adsXpath = `//img[@class='ytp-ad-image' or @class='ytp-ads-image']`
    try {
      await driver.wait(until.elementLocated(By.xpath(adsXpath)), 100);
      await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(adsXpath))), 100);
    }
    catch (err) {
      // console.log(`add is not shown`);
    }
    let adsImg = await driver.findElements(By.xpath(adsXpath));

    let replayButtonsXpath = `//button[@title='Replay']`
    try {
      await driver.wait(until.elementLocated(By.xpath(replayButtonsXpath)), 100);
      await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath(replayButtonsXpath))), 100);
    }
    catch (err) {
      // console.log(`replay button is not shown`);
    }
    let replayButtons = await driver.findElements(By.xpath(replayButtonsXpath));

    if ((replayButtons.length > 0) || (adsImg.length > 0)) {
      console.log(`inside rewatch if, calling rewatch function`);
      await rewatch();
    }
  }
}

await rewatch();