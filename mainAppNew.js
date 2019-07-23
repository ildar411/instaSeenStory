var parserNikNew = require('./parserNikNew');
var parserLinkNew = require('./parserLinksNew');
var storySeen = require('./storySeenNew');
var ig1 = require('instagram-private-api');
var Parser = require('goose-parser');

function sleep(miliseconds){
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + miliseconds);
}
function instaRobot(login, password, tagName){
    parserLinkNew(tagName).then(async results => {
        var IgApiClient = ig1.IgApiClient;
        process.env.IG_PASSWORD = password;
        process.env.IG_USERNAME = login;
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.IG_USERNAME);
        //ig.state.proxyUrl = process.env.IG_PROXY;
        const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        console.log(JSON.stringify(auth));
        console.log(results);
        for(res of results){
            console.log(res);    
            await parserNikNew(res.url).then(async res => {
                if(res){
                    
                    console.log(res[0].nik.substring(1, res[0].nik.length-1));

                    const targetUser = await ig.user.searchExact(res[0].nik.substring(1, res[0].nik.length-1)); // getting exact user by login
                    const reelsFeed = ig.feed.reelsMedia({ // working with reels media feed (stories feed)
                        userIds: [targetUser.pk], // you can specify multiple user id's, "pk" param is user id
                    });
                    const storyItems = await reelsFeed.items(); // getting reels, see "account-followers.feed.example.ts" if you want to know how to work with feeds
                    if (storyItems.length === 0) {// we can check items length and find out if the user does have any story to watch
                        console.log(`${targetUser.username}'s story is empty`);
                    return;
                    }
                    const seenResult = await ig.story.seen([storyItems[0]]);
      // now we can mark story as seen using story-service, you can specify multiple stories, in this case we are only watching the first story
    
                    console.log(seenResult.status);
                }
            else{
                console.log(res);
                
            }
        })
        }
    })
    
    
};
instaRobot('w1nw1n_marketing', '2237taec', 'bussines');
