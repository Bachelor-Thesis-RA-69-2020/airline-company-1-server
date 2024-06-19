const flightService = require('../service/flightService');

async function create(req, res) {
  const flightInformation = req.body;

  try {
    const flightDTO = await flightService.create(flightInformation);
    res.status(201).json({ message: 'Flight created.' });
  } catch (error) {
    if (error.message.includes('Airport with IATA code')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  create,
};
