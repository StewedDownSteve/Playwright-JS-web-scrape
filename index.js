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

  // Main problem is newest page only shows 30 articles, you then need to click "more" button which loads a new page with the next 30 articles. First code was simplier and collected all artcile on the page. Next had to have it collect articles from each page, using Playwright to click the "more" button. it collects articles until it has at least 100, then trims any etra


  let articles = [];
  // Blank array to be populated with newArticles, then trimmed to 100

  // while loop, keeps going until articles array raches 100
  while (articles.length < 100) {
    // Get article IDs on the current page
    let newArticles = await page.$$eval('.athing', rows =>
      rows.map(row => Number(row.getAttribute('id')))
    );

    // Add the new articles to the articles list, newArticles + already collected articles
    // The Set constructor creates a Set, which is a collection that only allows unique values.
    articles = [...new Set([...articles, ...newArticles])];

    console.log(`Collected ${articles.length} articles so far...`);
    // This is for debugging/making sure its working each page

    // If we have 100 in the articles array, stop
    if (articles.length >= 100) break;

    // Click the "More" button to load more articles 
    // Inspected more button class=morelink
    // Used Playwrite docs for using it to click button, + error handling
    const moreButton = await page.$('a.morelink');
    if (!moreButton) {
      console.log("No more pages available.");
      break;
    }

    await moreButton.click();
    
  }

  // Make sure to only keep the first 100 articles
  articles = articles.slice(0, 100);

  console.log(`Total articles collected: ${articles.length}`);

  // Check if articles are sorted from newest to oldest
  // The articles id numbers are sequential
  const isSorted = articles.every((id, i, arr) => i === 0 || arr[i - 1] > id);
  // If isSort is true then correct message else incorrect
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


// Breakdown of what needs to happen:
// Nav to the given url link
// Grab the first 30 articles with class, then id num
// Put the collected articles id num in an array
// Push the more button/load the next 30 articles
// One there are 100 articles stop
// Double check there are only 100/sort them from newest to oldest(id num)
// Print the result (Success or fail)
// Close the browser
// -------------------------------------------------------------------------



  // Select first 100 articles, using class= athing , then there is an id number for each article.
  // .slice(0, 100) - Takes only the first 100 articles.
  // gets the ID attribute from each class element
  // converts it into anumber using Number()
  // map function transform it from a array of strings to numbers "43094512" → 43094512

  // const articles = await page.$$eval('.athing', rows =>
  //   rows.slice(0, 100).map(row => Number(row.getAttribute('id')))
    
  // );

  // Check to make sure we have 100 articles.
  // if (articles.length !== 100) {
  //   console.error(`Should get 100 articles but only got ${articles.length}`)
  //   await browser.close();
  //   return;
    // if there aren't 100 articles it puts error message, give the number it actually got and closes broswers, otherwise it passes
  // }

  // Checks if the IDs numbers are sorted, descending order.
  // .every() loops through every element in articles array
  // returns true IF ALL ELEMENTS satisfy the condition, any flases and it will stop
  // i === 0: If we're at the first element (index 0), automatically pass (true).
  // There’s no previous item to compare, so we assume it’s correct.
  // For all other elements, check if the previous ID is greater than the current ID.
  // Since Hacker News sorts from newest (biggest ID) → oldest (smallest ID), this should be true for every pair.
//.every(...)	Checks all elements, stops at first failure
// (id, i, arr) =>	Gets current ID (id), index (i), and full array (arr)
// i === 0	The first element always passes
// arr[i - 1] > id	Ensures each previous ID is larger, proving the list is sorted
  // const isSorted = articles.every((id, i, arr) => i === 0 || arr[i - 1] > id);

  // if (isSorted) {
  //   console.log("100 articles are sorted correctly!");
  // } else {
  //   console.error("Articles are NOT sorted correctly.");
  // }

  //Close the browser
  // await browser.close();


// }
