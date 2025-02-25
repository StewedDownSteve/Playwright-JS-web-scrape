1. Install node modules by running 'npm i'

2. Run the project: node 'index.js'




# Playwright JS Hacker News Web Scraper  
A Playwright-powered web scraper that extracts the latest articles from Hacker News. This script automatically navigates the site, scrapes article titles and timestamps, and handles pagination to collect a full dataset of recent posts. It sorts them from newest to oldest and prints the title and age of article in the terminal. 


![Hacker News Scraper Preview](https://github.com/StewedDownSteve/Playwright-JS-web-scrape/blob/main/Playwright-JS-scraper.png)  

---  

## **How It's Made**  

### **Tech Used:**  
- **JavaScript (Node.js)**  
- **Playwright** for browser automation  
 

This was my **first time using Playwright**, so I approached it as a learning project to get familiar with its automation capabilities. The scraper works by:  
1. **Opening Hacker News** and loading the "newest" posts  
2. **Extracting data** (titles, timestamps, URLs) from each article, using playwright to select CSS class elements. 
3. **Handling pagination** by clicking "More" until it reaches 100 posts, using Playwright. 
4. **Filtering duplicates** and sorting the results  

The goal was to build a clean, maintainable script that can be extended in the future.  

---  

## **Optimizations**  
After getting the initial scraper working, I made several optimizations:  
✅ **Reduced unnecessary page reloads** by using Playwright’s built-in selectors instead of waiting for entire page loads  
✅ **Added deduplication logic** to avoid scraping the same article twice  
✅ **Used structured data extraction** to cleanly format the output  

Future improvements:  
🚀 **Save results to a CSV or JSON file** for easy use in other projects  
🚀 **Convert into a CLI tool** for user-friendly execution  
🚀 **Improve error handling** to handle network failures gracefully  

---  

## **Lessons Learned**  
- **Playwright is super powerful** and much smoother than older web automation tools.  
- Handling **pagination dynamically** was trickier than expected, but Playwright’s built-in waiting strategies helped a lot.  
- **Data cleaning is just as important** as scraping—formatting timestamps and filtering duplicates made the results much cleaner.  

Overall, this project was a great introduction to Playwright, and I’m excited to use it for more automation.  

---  

## **Examples – Other Scraper Projects**  
Check out my other web scrapers:  

🔹 **Go HTML Book Scraper:** [https://github.com/StewedDownSteve/Project-Portfolio-Directory?tab=readme-ov-file#go-html-web-scrapper]  
🔹 **Python Book Scraper:** [https://github.com/StewedDownSteve/Project-Portfolio-Directory?tab=readme-ov-file#python-html-web-scrapper]  

-




