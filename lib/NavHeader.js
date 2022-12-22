import { until, Builder, By, Key } from "selenium-webdriver";

import Page from './Page.js'

const avatarMenuLocator = `//button[@id='avatar-btn']`
const avatarDDImgLocator = `//tp-yt-iron-dropdown//yt-img-shadow[@id='avatar']/img`
const signInLocator = `//*[@id='text'][.='Sign in']`

export default class NavHeader extends Page {

  async setAvatarDDState(state) {
    return this.setState(state, avatarMenuLocator, avatarDDImgLocator, 500);
  }

  async selectAvatarDDoption(text) {
    const avatarDDoptionLocator = `//*[@id='label'][.='${text}']`
    this.click(avatarDDoptionLocator);
  }

  async clickSignInButton() {
    this.click(signInLocator);
  }
  
}