import { until, Builder, By, Key } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";

let options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";

export default class Page {

  defaultTimeout = 5000;
  // driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

  /**
   * 
   * @param {element} locator 
   * @param {string} type visible, enabled
   * @param {number} timeoutLocated timeout for located element
   * @param {number} timeoutVisible timeout for visible element
   * @returns {Promise} element
   */
  async findElement(locator, type, timeoutLocated, timeoutVisible) {
    let retval;
    switch (type) {
      case `visible`:
        await this.driver.wait(until.elementLocated(locator), timeoutLocated);
        let element = await this.driver.findElement(locator);
        retval = await this.driver.wait(until.elementIsVisible(element), timeoutVisible);
      case `enabled`:
        retval = await this.driver.wait(until.elementLocated(locator), timeoutLocated);
    }
    return retval;
  }

  async openPage(url) {
    try {
      console.log(`open ${url}`);
      await this.driver.get(url);
      console.log(`get title`);
      return await this.driver.getTitle();
    }
    catch (err) {
      console.log(`BasePage.openPage error: `, err);
    }
  }

  async getState(visibleLocator, hiddenLocator, delay) {
    try {
      await this.findElement(By.xpath(visibleLocator), 'visible', this.defaultTimeout, this.defaultTimeout);
      await this.findElement(By.xpath(hiddenLocator), 'visible', delay, delay);
      return 'open';
    }
    catch (err) {
      if (err.name === 'TimeoutError') {
        return 'closed'
      }
      else {
        console.log(`Page.getState error: `, err);
      }
    }
  }

  /**
   * 
   * @param {string} state 'open', 'closed' 
   * @param {string} visibleLocator element to click
   * @param {string} hiddenLocator element that is not displayed in the closed state
   * @param {number} delay timeout
   * @returns {Promise} element
   */
  async setState(state, visibleLocator, hiddenLocator, delay) {
    try {
      let currState = await this.getState(visibleLocator, hiddenLocator, delay);
      if (currState != state) {
        await this.click(visibleLocator);
        currState = await this.getState(visibleLocator, hiddenLocator, delay);
        if (currState === state) {
          return 'open';
        }
        else {
          throw `cant't set avatar menu state`;
        }
      }
    }
    catch (err) {
      console.log(`Page.setState error: `, err);
    }
  }

  async click(locator) {
    try {
      let element = await this.findElement(By.xpath(locator), 'visible', this.defaultTimeout, this.defaultTimeout);
      await element.click();
    }
    catch (err) {
      console.log(`Webdriver.clickAvatarMenu error: `, err);
    }
  }

  async sendString(text, locator) {
    let element = await this.findElement(By.xpath(locator), 'visible', this.defaultTimeout, this.defaultTimeout);
    await element.sendKeys(text);
  }

}