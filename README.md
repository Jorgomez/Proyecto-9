API REST of Data Scraping

This project is a basic REST API. The database was created with Mongo Atlas and the server with EXPRESS. It is a simulation of a laptop database scraped from the web https://www.powerplanetonline.com/es/portatiles . The data extracted from this page are the title, the price and the image, which are incorporated into the model that has the database, this is; Laptop.

## Technologies

- Node.js
- javaScript
- mongoDB
- Insomnia

## Dependencies

- Nodemon
- express
- dotenv
- mongoose
- puppeteer

## SCRAPPING

To start scraping the data, type the following command in the terminal -> : npm run scrap . This request will generate a file named laptops.json in which we will store all the extracted data in an array.

Then you can start make requests to our DDBB with the extracted data.

## API URL

http://localhost:3000

To make requests you must add to the API's url, (http://localhost:3000), the following:

/api/v1/laptops to make request of laptops.

Then, depending on the request you are doing, add the enpoints described below

## ENDPOINTS

#### LAPTOPS

post: '/uploadData' To upload the data extracted from the scrapping

get: '/' To get all laptops

put: /:id To update a laptop

delete /:id To delete a laptop

##### important

There is not front end, you have make the requests by INSOMNIA or the technology of your choice.
