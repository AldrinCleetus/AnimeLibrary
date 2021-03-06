const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path')
  

module.exports = 
{
   getScreenshot : async function getScreenshot(username)
   {

      /*const siteUrl = "http://localhost:4242/shelf/"*/
      const siteUrl = "https://animelibrary.herokuapp.com/shelf/"
      const screenshotUrl = siteUrl + username

      const browser = await puppeteer.launch(
      {
         headless: true,
         args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
         ]
      });

      const page = await browser.newPage();

      console.log("Going to screenshotUrl: ",screenshotUrl)


      try
      {
            page.setDefaultTimeout(0)

            await page.goto(screenshotUrl,
               {
                  waitUntil: 'networkidle0',
                  timeout: 0
               });

            console.log("Page Loaded! yay")

 
            if ( page.url() !== screenshotUrl) 
            { 
               console.log(screenshotUrl + " its not the same! " + page.url())
               throw new Error(404)
            }
            // Getting site max height and width
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

            await page.setViewport(
             { 
                width: 3840, 
                height: bodyHeight
             })

            

            
            await page.evaluate(async () => {
              // Scroll down to bottom of page to activate lazy loading images
              document.body.scrollIntoView(false);

              // Wait for all remaining lazy loading images to load
              await Promise.all(Array.from(document.getElementsByTagName('img'), image => {
                if (image.complete) {
                  return;
                }

                return new Promise((resolve, reject) => {
                  image.addEventListener('load', resolve);
                  image.addEventListener('error', reject);
                });
              }));
            });

            const animeAmount = await page.evaluate(() => Object.keys(document.getElementsByTagName('img')).length)

            console.log("Amount: "+ animeAmount)

            if (animeAmount > 300)
            {
              throw new Error(9001)
            }




            // Get the anime div
            const animeCover = await page.$('#main')

            // Its bounding box
            const box = await animeCover.boundingBox()

            // Its values
            const x = box['x']
            const y = box['y']
            const boxWidth = box['width']
            const boxHeight = box['height']



            console.log("Saving screenshot...")
            
            const screenshot = await page.screenshot(
            {
               /*path: 'screenshot.png',*/
               clip:{
                  'x':x,
                  'y':y,
                  'width': boxWidth,
                  'height': boxHeight
               },
               type: 'jpeg',
               quality: 100
            })

            console.log("Screenshot saved!")

            console.log("Closing browser")

            await browser.close()

            return screenshot

      }
      catch(e)
      {
            
            console.log(e.message)
            console.log("says libray-screenshot")

            throw e
      }

   }
}
