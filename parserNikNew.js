const Parser = require('goose-parser');
const ChromeEnvironment = require('goose-chrome-environment');


  
    async function parserNikNew(link){
        const env1 = new ChromeEnvironment({
            url: 'https://www.instagram.com' + link,
          });
            
          const parser1 = new Parser({ environment: env1 });
        try {
        
      return await parser1.parse({
        
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
    } catch (e) {
      console.log('Error occurred:');
      console.log(e.stack);
      await parser1.finish()
    }
    await parser1.finish();
    }


module.exports = parserNikNew;
// parserNikNew('/p/BzXlTVIhTfK/').then(res => {
//     console.log(res);
// }); 