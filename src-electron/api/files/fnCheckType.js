export const fnCheckType = (ext) => {
  switch (ext) {
    case '.mp4':
    case '.mkv':
    case '.mov':
      return 'video'
    case '.mp3':
    case '.wav':
    case '.flac':
      return 'audio'
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
    case '.bmp':
      return 'image'
    default:
      return 'other'
  }
}
