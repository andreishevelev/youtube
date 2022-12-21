import { until, Builder, By, Key } from "selenium-webdriver";

import Page from './Page.js'

const useAnotherAccLocator = `//*[.='Use another account']//*[local-name()='svg']`
const identifierLocator = `//input[@name='identifier']`;
const nextButtonLocator = `//button[.='Next']`
const passInputLocator = `//input[@name='password']`

export default class NavHeader extends Page {

  async clickUseAnotherAccount() {
    this.click(useAnotherAccLocator);
  }

  async enterIdentifier(identifier) {
    this.sendString(identifier, identifierLocator);
  }

  async clickNextButton() {
    // this.click(nextButtonLocator);
    await this.driver.wait(until.elementLocated(By.xpath(nextButtonLocator)), this.defaultTimeout)
    let click = this.driver.findElement(By.xpath(nextButtonLocator));
    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: click }).click().perform();
  }

}