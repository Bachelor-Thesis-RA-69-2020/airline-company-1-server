const discountService = require('../service/discountService');

async function create(req, res) {
  const discountInformation = req.body;

  try {
    await discountService.create(discountInformation);
    res.status(201).json({ message: 'Discount created.' });
  } catch (error) {
    msg = error.message
    if (msg.includes('Flight with flight number') || msg.includes('Validation')) {
      res.status(400).json({ error: msg });
    } else {
      res.status(500).json({ error: msg });
    }
  }
}

module.exports = {
  create
};
