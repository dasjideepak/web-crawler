const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const fs = require("fs");

// route to get homepage
router.get("/", function (req, res, next) {
  res.json({ success: true, message: "Welcome to API" });
});

// route to scrape data
router.get("/scrape", function (req, res, next) {
  (async function fechData() {
    try {
      // create a new browser instance
      const browser = await puppeteer.launch({ headless: true });

      // create a page inside the browser
      const page = await browser.newPage();

      // imdb url
      const url =
        "https://www.imdb.com/search/title/?groups=top_100&sort=user_rating,desc&count=100&ref_=adv_prv";

      // navigate to a website
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

      const movies = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".lister-item")).map(
          (movie) => ({
            title: movie.querySelector(
              ".lister-item-content > .lister-item-header > a"
            ).innerText,
            image: movie.querySelector(".lister-item-image > a > img").src,
            year: movie.querySelector(
              ".lister-item-content > .lister-item-header > .lister-item-year"
            ).innerText,
            runtime: movie.querySelector(
              ".lister-item-content > .text-muted > .runtime"
            ).innerText,
            genre: movie.querySelector(
              ".lister-item-content > .text-muted > .genre"
            ).innerText,
            certificate: movie.querySelector(
              ".lister-item-content > .text-muted > .certificate"
            ).innerText,
            rating: movie.querySelector(
              ".lister-item-content > .ratings-bar > .ratings-imdb-rating > strong"
            ).innerText,
            description: movie.querySelector(
              ".lister-item-content > p[class='text-muted']"
            ).innerText,
            votes: movie.querySelector(
              ".lister-item-content > .sort-num_votes-visible > span[name='nv']"
            ).innerText,
          })
        );
      });

      // write the json file
      fs.writeFileSync(
        "./moviesData.json",
        JSON.stringify(movies),
        (err) => err
      );

      // all done, close the browser
      await browser.close();
      res.send("Data Scrapping Successfull");
    } catch (error) {
      console.log(error);
      res.send("Something Went Wrong");
    }
  })();
});

// route to fetch movies from json file
router.get("/movies", function (req, res, next) {
  fs.readFile("moviesData.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json({ success: true, data: JSON.parse(data) });
  });
});

module.exports = router;
