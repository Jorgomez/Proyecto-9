const {
  UploadDataScrap,
  getAllLaptops,
  updateLaptop,
  deleteLaptop
} = require('../controllers/laptop')

const laptopsRouter = require('express').Router()

laptopsRouter.post('/uploadData', UploadDataScrap)
laptopsRouter.get('/', getAllLaptops)
laptopsRouter.put('/:id', updateLaptop)
laptopsRouter.delete('/:id', deleteLaptop)

module.exports = laptopsRouter
