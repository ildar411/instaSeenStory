const Parser = require('goose-parser');
const mysql = require('mysql');
const ChromeEnvironment = require('goose-chrome-environment');
const EventEmmitter = require('events');
const emitter = new EventEmmitter();
emitter.setMaxListeners(100);
const env = new ChromeEnvironment({
  url: 'https://www.instagram.com/explore/tags/aaa/',
});
 
const parser = new Parser({ environment: env });
function ins(results){
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'test',
        password: '1',
        database: 'insta_db',
    });
    results.map(result => { 
        
        pool.getConnection(function(err, conn){
        conn.query(mysql.format('insert into links(link, tagName) values(?, ?)',[result.url, 'aaa']), (err, results) =>
         {
            conn.release();
            if (err) throw err;
            console.log(results.id);
            
         })
    })
})
}
(async function () {
  try {
    const results = await parser.parse({
      
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
    await ins(results);
  } catch (e) {
    console.log('Error occurred:');
    console.log(e.stack);
  }
})();
/*function sel(tagName){
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'test',
        password: '1',
        database: 'insta_db',
    });
    pool.getConnection(function(err, conn){
        conn.query(mysql.format('select (link) from links where(link =?)',[tagName]), (err, results) =>
         {
            conn.release();
            if (err) throw err;
            console.log(results.id);
            return results;
            
         })
    })
}
(async function () {
    var results = await sel('aaa');
    results.map(async result => {
    try {
        const env1 = new ChromeEnvironment({
            url: 'https://www.instagram.com' + result.link,
          });
           
        const parser1 = new Parser({ environment: env1 });
      const results = await parser1.parse({
        
        rules: {
          scope: 'div.eleld',
          collection: [[
            {
              name: 'nik',
              scope: 'h2.BrX75',
            },
            
          ]]
        }
      });
      await ins(results);
    } catch (e) {
      console.log('Error occurred:');
      console.log(e.stack);
    }
})
  })()
*/