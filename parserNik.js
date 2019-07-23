const Parser = require('goose-parser');
const ChromeEnvironment = require('goose-chrome-environment');


function parserNik(link, tagName){
  function ins(results, tagName){
    var knex = require('knex')({
      client: 'mysql',
      connection: {  
        host: 'localhost',
        user: 'test',
        password: '1',
        database: 'insta_db',
      }
    });
    const info = [{
      nik: results[0].nik.substring(1, results[0].nik.length),
      tagName: tagName,
    }]
    knex('nikNames').insert(info).then(() => {
      console.log('niks inserted');
    }).catch(err => {
      console.log(err);
      if(err) throw err;
    }).finally(() => {
      knex.destroy();
    })
    
  }
  const env1 = new ChromeEnvironment({
    url: 'https://www.instagram.com' + link,
  });
    
  const parser1 = new Parser({ environment: env1 });
    (async result => {
      try {
        
      const results = await parser1.parse({
        
        rules: {
          scope: 'h2.BrX75',
          collection: [[
            {
              name: 'nik',
              scope: 'a',
              attr: 'href'
            },
            
          ]]
        }
      });
      console.log(results[0]);
      ins(results, tagName);
    } catch (e) {
      console.log('Error occurred:');
      console.log(e.stack);
    }
    })()
};

module.exports = parserNik;
/* parserNik('/p/BzXlTVIhTfK/');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'test',
    password: '1',
    database: 'insta_db',
  }
});

  knex('links').where({tagName: 'aaa'}).select('link').then(rows => {
    console.log(rows.length);
  }).catch(err => {
    console.log(err);
    if(err) throw err;
  }).finally(() => {
    knex.destroy();
  })
  */