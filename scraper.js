const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.usatoday.com/')
  .then(data => {
    let $ = cheerio.load(data.data);

    let result = [];

    $('.js-asset-headline').each(function (i, element){
      let title = $(element).text().trim();
      let link = $(element).parent().attr('href');
      result.push({
        title: title,
        link: `https://www.usatoday.com${link}`
      });
    });
    console.log(result);
  })
  .catch(err => {
    throw err;
  });