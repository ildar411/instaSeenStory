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
    results.map((result, i, arr) => { 
        if(!result){
            process.exit(0);
        }
        pool.getConnection(function(err, conn){
        conn.query(mysql.format('insert into links(link, tagName) values(?, ?)',[result.url, 'aaa']), (err, results) =>
         {
            conn.release();
            if (err) throw err;
            console.log(i);
            console.log(arr.length);
            if(i == arr.length-2){
                process.exit(0);
            }
            
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
