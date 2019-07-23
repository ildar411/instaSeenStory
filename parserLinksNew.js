const Parser = require('goose-parser');
const ChromeEnvironment = require('goose-chrome-environment');
  
  
  

  async function parserLinkNew (tagName) {
    const env = new ChromeEnvironment({
        url: `https://www.instagram.com/explore/tags/${tagName}`,
        });
        
        const parser = new Parser({ environment: env,
        pagination: {
            type: 'page',
            scope: '.page',
            pageScope: '.pageContainer',
      
        } });
    try {
        
      return await parser.parse({
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
      console.log(res);
  } catch (e) {
      console.log('Error occurred:');
      console.log(e.stack);
      //await parser.finish();
  }
  //await parser.finish();
  };
  

parserLinkNew('магнитогорск');
module.exports = parserLinkNew;