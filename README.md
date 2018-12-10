# News Scraper
A web program that allows users to view news headlines and save their preferred ones. It allows users to add notes to saved articles and delete them as they wish.

## How does it work?
Program uses a scraper to get news headlines, link and description from usatoday.com website. Once it has scraped that specific information it saves it to a Mongo Database using mongoose. 

## Demo
1. Go to http://thenews-scraper.herokuapp.com 
2. Click `Scrape New Articles` button and wait to recieve articles
3. Click `Bookmark Icon` to save a chosen article
4. To view saved articles click `Save Articles` on navigation bar
5. On saved articles page you get two options: `Delete` & `Add note`
    - To add a note click yellow `Add Note Icon`
    - You'll see the previous notes you've saved and you can delete them by clicking the `Trash Can Icon` 
    - To add a note, enter the note in the textarea then click `Add Icon`
6. To delete an article click `Trash can icon`

## Technology used:
- NodeJS
- Express
- JQuery
- Mongoose
- Axios
- Cheerio
- JQuery
