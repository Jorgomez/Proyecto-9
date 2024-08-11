const laptops = require('../../../laptops.json')
const Laptop = require('../models/laptop')

const UploadDataScrap = async (req, res, next) => {
  try {
    await Laptop.collection.drop()
    console.log('laptops deleted')
    const dataUpload = await Laptop.insertMany(laptops)
    return res.status(201).json(dataUpload), console.log(dataUpload.length)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getAllLaptops = async (req, res, next) => {
  try {
    const allLaptops = await Laptop.find()
    return res.status(200).json(allLaptops), console.log(allLaptops.length)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateReq = req.body
    const laptop = await Laptop.findById(id)
    if (!laptop) {
      return res.status(404).json('Laptop not found')
    }

    const updatedLaptop = await Laptop.findByIdAndUpdate(id, updateReq, {
      new: true
    })

    return res.status(200).json(updatedLaptop)
  } catch (error) {
    return res.status(400).json('error to update')
  }
}

const deleteLaptop = async (req, res, next) => {
  try {
    const { id } = req.params
    const laptopDeleted = await Laptop.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: 'Deleted laptop', laptopDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}

module.exports = { UploadDataScrap, getAllLaptops, updateLaptop, deleteLaptop }
