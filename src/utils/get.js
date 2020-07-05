const got = require('got');

const fetch = (url) => {
  return got(url)
}

export {
  fetch
}