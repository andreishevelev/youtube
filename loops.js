const videos = ['video1', 'video2', 'video3']
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

for (let i = 0; i < 3; i++) {
  let watchedVideos = []

  while (1 === 1) {
    let videoNum = getRandomIntInclusive(0, videos.length - 1)
    let video = videos[videoNum]
    if (!watchedVideos.includes(video)) { watchedVideos.push(video) }
    console.log(`watchedVideos `, watchedVideos);
    if (watchedVideos.length === videos.length) { break }
  }


}