const morphquest = require('./morphquest');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; };

class Dota2Core {
  constructor(key) {
    _defineProperty(this, 'key', null);
    _defineProperty(this, 'baseUrl', 'https://api.steampowered.com/');

    if (!key) {
      throw new Error('key is required');
    }

    this.key = key;
  }

  getData(path, options = {}) {
    const url = this.buildURL(path, options);

    return morphquest(url);
  }

  buildURL(path, options) {
    let fullUrl = this.baseUrl + path + '/?key=' + this.key;
    const params = Object.keys(options);

    if (params.length) {
      params.forEach((key) => {
        fullUrl += `&${key}=${options[key]}`;
      });
    }

    return fullUrl;
  }

  getHeroes() {
    return this.getData('IEconDOTA2_570/GetHeroes/v1');
  }
}

module.exports = Dota2Core;
