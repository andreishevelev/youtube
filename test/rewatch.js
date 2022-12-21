import { expect } from "chai";
import { until, Builder, By, Key, Origin } from "selenium-webdriver";
import * as mongodb from '../Mongodb.js';
import { Options } from "selenium-webdriver/chrome.js";

var options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

let defTimeout = 5000;

let emailStr = `karlovas241@gmail.com`
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

const channelName = `veselovka channel`
let watchedTitles = [];
let videoTitles = await mongodb.findOneST("google", "videos");
await driver.sleep(3000);
videoTitles = videoTitles.document.videos;

// fetch users from mongo

// inf loop

// for each user

// open youtube.com

// log in

async function rewatch() {

  let titleNum = getRandomIntInclusive(0, videoTitles.length - 1);
  let videoTitle = videoTitles[titleNum];

  if (watchedTitles.length === videoTitles.length) { watchedTitles = [] } // TODO Log out, break
  if (watchedTitles.includes(videoTitle)) { await rewatch() }

  // open youtube.com
  console.log(`open youtube.com`);
  await driver.get(youtubeUrl);
  let actions = driver.actions({ async: true });

  // enter video name to the search input
  console.log(`enter video name to the search input`);
  let searchInput = await waitLV(By.xpath(`//input[@id="search"]`), defTimeout);
  await actions.move({ origin: searchInput }).perform();
  await driver.sleep(2000);
  await searchInput.sendKeys(`veselovka channel ${videoTitle}`);

  // click search button
  console.log(`click search button`);
  let searchButton = await waitLV(By.xpath(`//button[@id="search-icon-legacy"]`), defTimeout);
  await actions.move({ origin: searchButton }).perform();
  await driver.sleep(2000);
  await searchButton.click();

  // click video title
  console.log(`click video title`);
  let videoTileArr = videoTitle.split(' ')
  let firstWord = videoTileArr[0];
  let resultTile = await driver.wait(until.elementLocated(By.xpath(`//div[@id='title-wrapper']//*[contains(text(), '${firstWord}')] | //a[contains(text(), '${firstWord}')]`)), defTimeout);
  await actions.move({ origin: resultTile }).perform();
  await driver.sleep(1000);
  await resultTile.click();
  await driver.sleep(1000);

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

  // try to set playback speed to x2 speed
  try {
    // mouse over the video
    console.log(`mouse over the video`);
    let video = await waitLV(By.xpath(`//video`), defTimeout);
    actions = driver.actions({ async: true });
    await actions.move({ origin: video }).perform();

    // set playback speed to 2x
    // click settings button
    console.log(`set playback speed to 2x`);
    console.log(`click settings button`);
    let settingsButton = await waitLV(By.xpath(`//button[@title='Settings']`), 2000);
    await settingsButton.click();
    await driver.sleep(700);

    // select playback speed option
    console.log(`select playback speed option`);
    let plSpeedButton = await waitLV(By.xpath(`//div[.='Playback speed']`), 2000);
    await plSpeedButton.click();
    await driver.sleep(800);

    // select 2x speed
    console.log(`select 2x speed`);
    let speed2x = await waitLV(By.xpath(`//div[@class='ytp-menuitem-label' and .='2']`), 2000);
    await speed2x.click();
    await settingsButton.click();
    await driver.sleep(1200);
  }
  catch (err) {
    console.log(`Set up 2x speed error`, err);
  }

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