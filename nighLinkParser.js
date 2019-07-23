
const Night = require('nightmare');
const night = new Night({
    show: false,
});
Night.action('scroll', function(done){ 
    setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 2000)
});
async function parser(tagName){
    night
    .goto(`https://www.instagram.com/explore/tags/${tagName}`)
    .evaluate(async () => {
        var links = []
        links = document.querySelectorAll('a');
        //await scroll();

        console.log(document.querySelectorAll('a'));
        return await document.querySelectorAll('a');
    })
    .end()
    .then(console.log)
    
    .catch(err => {
        console.log(err);
    })
    
}
parser('магнитогорск');
