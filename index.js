const Parser = require('goose-parser');
const mysql = require('mysql');
const ChromeEnvironment = require('goose-chrome-environment');





function parserLink(tag){
  async function processArray(array, tagName){
    function ins(item, tagName){
      var knex = require('knex')({
        client: 'mysql',
        connection: {
          host: 'localhost',
          user: 'test',
          password: '1',
          database: 'insta_db',
        }
      });
      var info = [{
        link: item.url,
        tagName: tagName,
      }];
      knex('links').insert(info).then(() => {
        console.log('links inserted');
      }).catch(err => {
        console.log(err);
        if(err) throw err;
      }).finally(() => {
        knex.destroy();
      })
        
    }
    for(const item of array){
      await ins(item, tagName);
      
    }
  }
  var results;
  const env = new ChromeEnvironment({
  url: 'https://www.instagram.com/explore/tags/' + tag,
  });
  
  const parser = new Parser({ environment: env,
  pagination: {
      type: 'page',
      scope: '.page',
      pageScope: '.pageContainer',

  } });

  (async function () {
  try {
      results = await parser.parse({
      rules: {
          scope: 'a',
          collection: [[
          {
              name: 'url',
              attr: 'href',
          },
          
          ]]
      }
      });
      console.log(results);
      processArray(results);
  } catch (e) {
      console.log('Error occurred:');
      console.log(e.stack);
  }
  })();
};
parserLink('aaa');
module.exports = parserLink