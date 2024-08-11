const puppeteer = require('puppeteer')
const fs = require('fs')
const arrayLaptops = []
const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-notifications'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  await page.setViewport({ width: 1080, height: 1024 })
  await page.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
  await antiLock(page)
  repeat(page, browser)
}

const repeat = async (page, browser) => {
  const divProducts = await page.$$('.p-list-in-wrp')
  for (const divProduct of divProducts) {
    let price
    let img = await divProduct.$eval('.product-list-img ', (el) => el.src)
    let title = await divProduct.$eval('.productListItemH3', (el) =>
      el.textContent.trim()
    )
    price = await divProduct.$eval(
      '.product-price>.price',
      (el) => el.textContent
    )
    price = parseFloat(
      price.replace('€', '').replace('.', '').replace(',', '.')
    )
    const laptop = {
      title,
      img,
      price
    }
    arrayLaptops.push(laptop)
  }
  try {
    await delay(1000)
    await page.click('.pagination li.arrow.text:last-of-type > a')
    console.log(`${arrayLaptops.length} data saved`)
    await delay(2000)
    await repeat(page, browser)
  } catch (error) {
    console.log(arrayLaptops)
    write(arrayLaptops)
    console.log('No more pages to navigate:', error)
    await browser.close()
  }
}

const antiLock = async (page) => {
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight)
  })

  await delay(1000)
  await page.click('[aria-label="Close"]')
  await delay(8000)
  await page.click('[href="#__cn_close_content"]')
  await delay(12000)
  await page.click('[href="#__cn_close_content"]')
}

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}
const write = (arrayLaptops) => {
  fs.writeFile('laptops.json', JSON.stringify(arrayLaptops), () => {
    console.log('file wrote')
  })
}
module.exports = { scrapper }
