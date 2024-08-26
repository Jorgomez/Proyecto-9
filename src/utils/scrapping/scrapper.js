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
  antiLock(page)
  await page.waitForSelector(
    'footer.modal-cookies__footer button.button--primary.button--md.button--black'
  )
  await page.click(
    'footer.modal-cookies__footer button.button--primary.button--md.button--black'
  )
  delay(2000)
  repeat(page, browser)
}

const repeat = async (page, browser) => {
  const divProducts = await page.$$('.product-card.w-app-link.product-card')

  for (const divProduct of divProducts) {
    let strinPrice
    let img = await divProduct.$eval('.product-card__image', (el) => el.src)
    let title = await divProduct.$eval(
      '.product-card__name.font-m.bold',
      (el) => el.textContent.trim()
    )
    strinPrice = await divProduct.$eval(
      '.price__container',
      (el) => el.textContent
    )

    let price = strinPrice.match(/€(\d+,\d+)/)[0]
    price = parseFloat(
      price.replace('€', '').replace('.', '').replace(',', '.')
    )

    const laptop = {
      title,
      img,
      price
    }
    arrayLaptops.push(laptop)
    console.log(laptop)
  }
  try {
    await delay(1000)
    await page.waitForSelector(
      '.numbers-pagination__icons.numbers-pagination__icons--light'
    )
    await page.evaluate(() => {
      const container = document.querySelector(
        '.numbers-pagination.listing-content__numbers-pagination'
      )
      if (container) {
        const icons = container.querySelectorAll(
          '.numbers-pagination__icons.numbers-pagination__icons--light'
        )
        if (icons.length > 0) {
          const lastIcon = icons[icons.length - 1]
          lastIcon.click()
        }
      }
    })

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

  // await delay(8000)
  // await page.click('[href="#__cn_close_content"]')
  // await delay(12000)
  // await page.click('[href="#__cn_close_content"]')
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
