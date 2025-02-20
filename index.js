// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser, headless: false = see browser open
  const browser = await chromium.launch({ headless: false });
  // create new page
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News, the 'newest' page
  await page.goto("https://news.ycombinator.com/newest");

  
  let articles = [];
  // blank array to hold articles
  
  
  while (articles.length < 100) {
    let newArticles = await page.locator('.athing').evaluateAll(rows =>
      rows.map(row => Number(row.getAttribute('id')))
    );

    articles = [...new Set([...articles, ...newArticles])];


    // If we have 100 in the articles array, stop
    if (articles.length >= 100) break;

   
    const moreButton = page.locator('a.morelink');

    if (!moreButton) {
      console.log("No more pages available.");
      break;
    }

    await moreButton.click();
    await page.waitForTimeout(1000); // Wait for 1 second
    
  }

 
  articles = articles.slice(0, 100);

  console.log(`Total articles collected: ${articles.length}`);

  
  const isSorted = articles.every((id, i, arr) => i === 0 || arr[i - 1] > id);
 
  if (isSorted) {
      console.log("100 articles are sorted correctly!");
    } else {
      console.error("Articles are NOT sorted correctly.Debug!");
    }

  await browser.close();
}



(async () => {
  await sortHackerNewsArticles();
})();



// -------------------------------------


// while() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while 
// every() -  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// map() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spread syntax - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


//  Set - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// locator, evaluate all - https://playwright.dev/docs/api/class-locator#locator-evaluate-all
// Mouse click -  https://playwright.dev/docs/input#mouse-click