import { expect } from "chai";
import * as mongodb from '../Mongodb.js';
import NavHeader from '../lib/NavHeader.js'
import Accounts from '../lib/Accounts.js'

let navHeader = new NavHeader();
let accounts = new Accounts();

let emailStr = `sheveleva.oksana.34@gmail.com`
let basePasswordStr = `20LDFLWFNM`
const youtubeUrl = `https://www.youtube.com`
const ytHomeTitle = `YouTube`;
const channelName = `veselovka channel`

// let watchedTitles = [];
// let videoTitles = await mongodb.findOneST("google", "videos");
// videoTitles = videoTitles.document.videos;

// fetch users from mongo

// inf loop

// for each user

// open youtube.com

// log in

describe('Can watch multiple videos', function() {
  // this.retries(1000);
  this.timeout(0);

  // it(`Can open ${youtubeUrl}`, async function() {
  //   let actualTitle = await navHeader.openPage(youtubeUrl);
  //   expect(actualTitle).to.equal(ytHomeTitle);
  // });

  it(`Can sign in`, async function() {
    // await navHeader.clickSignInButton();
    // await accounts.clickUseAnotherAccount();
    // await accounts.enterIdentifier(emailStr);
    await accounts.clickNextButton();
  });



  // it(`Can open avatar dropdown`, async function() {
  //   let avatarMenuState = await navHeader.setAvatarDDState('open');
  //   expect(avatarMenuState).to.equal('open');
  // });

  // it(`Can select Sign out option in the avatar dropdown`, async function() {
  //   navHeader.selectAvatarDDoption('Sign out');
  // });

})



// async function rewatch() {


//   // let titleNum = getRandomIntInclusive(0, videoTitles.length - 1);
//   // let videoTitle = videoTitles[titleNum];

//   // if (watchedTitles.length === videoTitles.length) { watchedTitles = [] } // TODO Log out, break
//   // if (watchedTitles.includes(videoTitle)) { await rewatch() }


  
// }

// await rewatch();