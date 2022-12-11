import { expect } from "chai";
import { until, Builder, By, Key } from "selenium-webdriver";
import Mongodb from "../Mongodb.js"
import { Options } from "selenium-webdriver/chrome.js";

let mongodb = new Mongodb();

var options = new Options();
options.options_["debuggerAddress"] = "127.0.0.1:9222";
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

await driver.manage().window().maximize();

let defTimeout = 10000;

let emailStr = `sheveleva.oksana.34@gmail.com`
let basePasswordStr = `20LDFLWFNM`
let googleUrl = `https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=GAZAmgQ`
let addAccUrl = `https://accounts.google.com/v3/signin/identifier?dsh=S1024292338%3A1670629153989993&authuser=0&continue=https%3A%2F%2Fwww.google.com%2F%3Fpli%3D1&ec=GAlAmgQ&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession`
let solUrl = `https://www.stackoverflow.com`
let userNameStr = `kimbulychan` // TODO add generator
const userNameArr = userNameStr.split('');
let passwordStr = `Perfection1`
const passwordArr = passwordStr.split('');

let randMonth = 3
let randDay = 5
let randYear = 1977
let firstNameStr = "Andrei"
const firstNameArr = firstNameStr.split('');
let lastNameStr = "Shevelev"
const lastNameArr = lastNameStr.split('');

let waitLV = async (locator, timeout) => {
  await driver.wait(until.elementLocated(locator), timeout);
  let element = driver.wait(until.elementIsVisible(await driver.findElement(locator)), timeout);
  return element;
}

function getRandomIntInclusive() {
  let min = 100;
  let max = 400;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const screenshot = allure.createStep("saveScreenshot", async name => {
  const res = await driver.takeScreenshot();
  // Webdriver.io produces values as base64-encoded string. Allure expects either plain text
  // string or Buffer. So, we are decoding our value, using constructor of built-in Buffer object
  allure.createAttachment(name, new Buffer.from(res, "base64"));
});

describe(`Can update dice.com profile`, function () {
  this.timeout(60000);

  before(async () => {
    // await driver.get(addAccUrl);
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

  it(`can create an account`, async () => {

    // log in to google account
    // let email = await waitLV(By.css(`#identifierId`), defTimeout);
    // await email.sendKeys(emailStr + '\n');
    // let basePassword = await waitLV(By.css(`[name="Passwd"]`), defTimeout);
    // await basePassword.sendKeys(basePasswordStr + '\n');

    // create new account page
    // let img = await waitLV(By.xpath(`//img`), defTimeout);
    // await img.click();
    // let newAcc = await waitLV(By.xpath(`//div[.='Add another account']`), defTimeout);
    // await newAcc.click();


    // await driver.sleep(1000);
    // let createAcc = await waitLV(By.xpath(`//div[.='Create account']`), defTimeout);
    // await createAcc.click();
    // await driver.sleep(1500);
    // let personal = await waitLV(By.xpath(`//span[.='For my personal use']`), defTimeout);
    // await personal.click();
    // await driver.sleep(1700);


    // create new account
    // let firstName = await waitLV(By.css(`#firstName`), defTimeout);
    // await firstName.lick();
    await driver.sleep(getRandomIntInclusive());
    for (let i = 0; i < firstNameArr.length; i++) {
      // await firstName.sendKeys(firstNameArr[i]);
      let actions = driver.actions();
      await actions
        .keyDown(firstNameArr[i])
        .keyUp(firstNameArr[i])
        .perform();
      await driver.sleep(getRandomIntInclusive());
    }
    await driver.sleep(getRandomIntInclusive());
    let actions = driver.actions();
    await actions
      .keyDown(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());

    // let lastName = await waitLV(By.css(`#lastName`), defTimeout);
    // await lastName.click();
    await driver.sleep(getRandomIntInclusive());
    for (let i = 0; i < lastNameArr.length; i++) {
      // await lastName.sendKeys(lastNameArr[i]);
      let actions = driver.actions();
      await actions
        .keyDown(lastNameArr[i])
        .keyUp(lastNameArr[i])
        .perform();
      await driver.sleep(getRandomIntInclusive());
    }

    await driver.sleep(5000);
    // let suggestedUsername = await waitLV(By.xpath(`//button`), defTimeout);
    // await suggestedUsername.click();

    // double tab
    await driver.sleep(getRandomIntInclusive());
    actions = driver.actions();
    await actions
      .keyDown(Key.TAB)
      // .keyUp(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());
    actions = driver.actions();
    await actions
      .keyDown(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());


    actions = driver.actions();
    await actions
      .keyDown(Key.SPACE)
      .keyUp(Key.SPACE)
      .perform();
    await driver.sleep(getRandomIntInclusive());
    await actions
      .keyDown(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());
    actions = driver.actions();
    await actions
      .keyDown(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());

    // let userName = await waitLV(By.css(`#username`), defTimeout);
    // console.log(`usernameArr`, userNameArr)
    // for (let i = 0; i < firstNameArr.length; i++) {
    //   await userName.sendKeys(firstNameArr[i].toLocaleLowerCase());
    //   await driver.sleep(500);
    // }
    // for (let i = 0; i < lastNameArr.length; i++) {
    //   await userName.sendKeys(lastNameArr[i].toLocaleLowerCase());
    //   await driver.sleep(500);
    // }

    // let password = await waitLV(By.css(`[name="Passwd"]`), defTimeout);
    await driver.sleep(getRandomIntInclusive());
    for (let i = 0; i < passwordArr.length; i++) {
      // await password.sendKeys(passwordStr[i]);
      let actions = driver.actions();
      await actions
        .keyDown(passwordArr[i])
        .keyUp(passwordArr[i])
        .perform();
      await driver.sleep(getRandomIntInclusive());
    }
    actions = driver.actions();
    await actions
      .keyDown(Key.TAB)
      .perform();
    await driver.sleep(getRandomIntInclusive());
    // let confirm = await waitLV(By.css(`[name="ConfirmPasswd"]`), defTimeout);
    await driver.sleep(getRandomIntInclusive());
    for (let i = 0; i < passwordArr.length; i++) {
      // await confirm.sendKeys(passwordStr[j]);
      let actions = driver.actions();
      await actions
        .keyDown(passwordArr[i])
        .keyUp(passwordArr[i])
        .perform();
      await driver.sleep(getRandomIntInclusive());
    }
    // await confirm.sendKeys('\n');

    await driver.sleep(getRandomIntInclusive());

    /* 
    let actions = driver.actions();
    await actions
    .keyDown(Key.ENTER)
    .keyUp(Key.ENTER)
    .perform();
    */

    // let next = await waitLV(By.xpath(`//span[.="Next"]`), defTimeout);
    // await next.click();

  });
});