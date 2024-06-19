const flightService = require('../service/flightService');

async function create(req, res) {
  const flightInformation = req.body;

  try {
    await flightService.create(flightInformation);
    res.status(201).json({ message: 'Flight created.' });
  } catch (error) {
    msg = error.message
    if (msg.includes('Airport with IATA code') || msg.includes('Validation')) {
      res.status(400).json({ error: msg });
    } else {
      res.status(500).json({ error: msg });
    }
  }
}

module.exports = {
  create
};
