const nodeEnv = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// use https module if node environment and xhr in browser
const morphquest = async function (url) {
  if (nodeEnv) {
    const https = require('https');
    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      })

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  } else {
    // since steam doesn't allow cors requests from browser even if domen is correct, this is just an example
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xmlHttp.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.open('GET', url, true);

      xhr.send(null);
    });
  }
}

module.exports = morphquest;
