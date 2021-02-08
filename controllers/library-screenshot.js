const puppeteer = require('puppeteer-core');
const fs = require('fs')
const path = require('path')
  

module.exports = 
{
   getScreenshot : async function getScreenshot(username)
   {

      const siteUrl = "http://localhost:4242/shelf/"
      const screenshotUrl = siteUrl + username

      /*const filePath = path.join(__dirname,"/public/temp/screenshot.png")*/

      const browser = await puppeteer.launch(
      {
         executablePath: '/usr/bin/chromium-browser',
         headless: true
      });

      const page = await browser.newPage();

      console.log("Going to screenshotUrl: ",screenshotUrl)

      

      /*page.setViewport(
      {
         width: 1280,
         height: 720,
         deviceScaleFactor:2
      })*/
   


      try
      {
            await page.goto(screenshotUrl,
               {
                  waitUntil: 'networkidle0',
                  timeout: 0
               });

 
            if ( page.url() !== screenshotUrl) 
            { 
               console.log(screenshotUrl + " its not the same! " + page.url())
               return new Error("Page not found!")
            }
            // Getting site max height and width
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

            await page.setViewport(
             { 
                width: 3840, 
                height: bodyHeight
             })

            // Get the anime div
            const animeCover = await page.$('#main')

            //Its bounding box
            const box = await animeCover.boundingBox()

            //Its values
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
               }
            })

            console.log("Screenshot saved!")

            console.log("Closing browser")

            console.log()

            await browser.close()

            return screenshot



      }
      catch(e)
      {
            console.log("Error at libray-screenshot")

            console.log(e.message)
            return e
      }

   },

   removeScreenshot: function removeScreenshot()
   {
      fs.unlink('scr.png', (err) => 
      {
          console.log("File is deleted");
      })
   }
}
