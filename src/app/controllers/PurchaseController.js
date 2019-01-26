const Ad = require('../models/Ad')
const User = require('../models/User')

const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAD = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAD,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
