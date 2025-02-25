
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
  // blank array to store articles

  while (articles.length < 100) {
      // Wait for the page to load
      await page.waitForSelector('.athing');

      // Extract articles from current page
      // Use playwright $$eval to find class = athing
      // use querySelector to find class titleline then takes innerText from the a>
      // find the age a time stamp and the inner text(time)
      // for each article return the { title, age(time stamp)}
      const newArticles = await page.$$eval('.athing', (rows) => {
          return rows.map((row) => {
              const titleElement = row.querySelector('.titleline > a');
              const title = titleElement ? titleElement.innerText : 'No Title';

              const ageElement = row.nextElementSibling?.querySelector('.age a');
              const age = ageElement ? ageElement.innerText : 'No Time';

              return { title, age };
          });
      });

      // Add new articles, ensuring we don't go over 100
      // spread operator only allows for unique articles, no repeats
      articles = [...articles, ...newArticles].slice(0, 100);

      // Stop if we have enough articles (100)
      if (articles.length >= 100) break;

      // Click the "More" button to load next page
      // Main problem was that each page only loads 30 articles at a time.
      //  Use playwright to click the next button to continue collectiong articles
      const moreButton = await page.$('a.morelink');
      if (!moreButton) {
          console.log('No more pages available.');
          break;
      }
      await moreButton.click();
      await page.waitForTimeout(1000); // Small delay for next page to load
  }

  // Log the total number of articles, then list the articles (title and age)
  console.log(`Total articles collected: ${articles.length}`);
  console.log(articles);

  // Check if articles are sorted from newest to oldest
  let sorted = true;
  for (let i = 1; i < articles.length; i++) {
      if (new Date(articles[i - 1].age) < new Date(articles[i].age)) {
          sorted = false;
          break;
      }
  }

  if (sorted) {
      console.log('The first 100 articles are sorted from newest to oldest.');
  } else {
      console.log('The articles are NOT sorted correctly. Debug!');
  }

  await browser.close();
};



(async () => {
  await sortHackerNewsArticles();
})();



// -------------------------------------


// while() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while 
// Date - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// every() -  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// map() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spread syntax - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// nextElementSibling - https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling



// locator, evaluate all - https://playwright.dev/docs/api/class-locator#locator-evaluate-all
// $$eval -  https://playwright.dev/docs/evaluating
// Mouse click -  https://playwright.dev/docs/input#mouse-click
