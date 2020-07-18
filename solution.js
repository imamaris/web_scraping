const request = require('request');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');
const fs = require('fs');
const { title } = require('process');
const url = 'https://www.bankmega.com/promolainnya.php'
const clearfixed = []
const data_header = []
const data_body = []
// var obj = {
//   judul,
//   header: []
// };

request(url, function(error, response, html) {
    //console.log(response);
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        
        $('#subcatpromo').each((i, div) => {
          const children = $(div).children();
          const data_title = []
          children.each((i, div) => {
              category = $(div).find('img').attr('title');
              source = $(div).find('img').attr('src')
              //console.log(category)
              data_header.push({category, imageurl: source})
          });         
});
        $('.clearfix').each((i, ul) => {
            const children = $(ul).children();
            const data = []
            children.each((i, li) => {
              const children = $(li).children();
              children.each((i, a) => {
                link = $(a).attr('href');
               // console.log($(a).text());
                const title = $(a).find('img').attr('title');
                const url = $(a).find('img').attr('src');
                data[i] = {title, url};
                //console.log(data)
                data_body.push(data[i])
                
              })
  
            })
            
            
          });
          //console.log(data_header)
          //console.log(data_body)

   
    const contentJSON = {
      data_header,
      data_body
      
    }
    const final = JSON.stringify(contentJSON);
    const filename = 'solution.json'
    fs.writeFileSync(filename, final)
    }
})