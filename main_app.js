var parserNik = require('./parserNik');
var parserLink = require('./parserLinks1');
var seenStory = require('./seenStory');

function sleep(miliseconds){
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + miliseconds);
}
async function instaRobot(login, password, tagName){
    var knex = require('knex')({
        client: 'mysql',
        connection: {
        host: 'localhost',
        user: 'test',
        password: '1',
        database: 'insta_db',
        }
    });
    await parserLink(tagName);
    await knex('links').where({tagName: tagName}).select('link').then(async rows => {
        for(var i = 0; i < rows.length; ++i){
            if(i % 5 == 0){
                sleep(10000);
            }
            await parserNik(rows[i].link, tagName);
        }
    }).catch(err => {
        console.log(err);
        if(err) throw err;
    }).finally(() => {
        knex.destroy();
    });
    await knex('nikNames').where({tagName : tagName}).select('nik').then(async rows =>{
        for(var i = 0; i < rows.length; ++i){
            if(i % 5 == 0){
                sleep(10000);
            }
            await seenStory(login, password, rows[i].nik);
        }
    }).catch(err => {
        console.log(err);
        if(err) throw err;
    }).finally(() => {
        knex.destroy();
    });
};
instaRobot('murtazin_i', '381635vg', 'aaa');
