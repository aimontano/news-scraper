const axios = require('axios');
const cheerio = require('cheerio');

async function getDescription (url){
  try {
    let article = await axios(url);

    let $ = cheerio.load(article.data);

    let description = "";

    $('p.speakable-p-1').each((i, element) => {
      description += $(element).text();
    });

    $('p.speakable-p-2').each((i, element) => {
      description += ` ${$(element).text()}`;
    });

    return description;
  } catch(e) {
    return "No Description";
  }
}

async function getArticles (cb) {
  let result = [];
  try {
    let usaToday = await axios('https://www.usatoday.com/');
    let $ = cheerio.load(usaToday.data);

    $('.js-asset-headline').each(function (i, element){
      let title = $(element).text().trim();
      let link = $(element).parent().attr('href');

      if(link != undefined) {
        link = `https://www.usatoday.com${link}`;
    
        let description =  getDescription(link)
          .then(desc => {
            result.push({
              title: title,
              link: link,
              description: desc
            });  
            cb(result);
            return result;
          });
      }
    });
  } catch(e) {
    return e;
  }
}

module.exports = {
  getArticles
};