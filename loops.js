// const videos = ['video1', 'video2', 'video3']
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

// for (let i = 0; i < 3; i++) {
//   let watchedVideos = []

//   while (1 === 1) {
//     let videoNum = getRandomIntInclusive(0, videos.length - 1)
//     let video = videos[videoNum]
//     if (!watchedVideos.includes(video)) { watchedVideos.push(video) }
//     console.log(`watchedVideos `, watchedVideos);
//     if (watchedVideos.length === videos.length) { break }
//   }
// }





// let string = 'Hello world  two spaces   three spaces  two spaces'

// function replaceSpaces(string) {
//   while (string.includes('  ')) {
//     console.log(`inside while`);
//     string = string.replace(/\s\s/, ' ');
//   }
//   return string;
// }

// let actualTitle = replaceSpaces(string);
// console.log(`****************************actualTitle without double spaces `, actualTitle);



let string1 = `Очень смешное видео! Как крутить обруч! Семейный канал Веселовка. Hula hoop. Funny family channel`
let string2 = `Очень смешное видео! Как крутить обруч! Семейный канал Веселовка. Hula hoop. Funny family channeld`

while (string2.includes('й')) {
  string2 = string2.replace(/й/, 'й');
}