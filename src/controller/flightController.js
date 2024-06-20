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

async function findByFlightNumber(req, res) {
  const flightNumber = req.params.flightNumber;
  
  try {
    const flight = await flightService.findByFlightNumber(flightNumber, true);
    res.status(200).json(flight);
  } catch (error) {
    msg = error.message
    if (msg.includes('Flight with flight number')) {
      res.status(404).json({ error: msg });
    } else {
      res.status(500).json({ error: msg });
    }
  }
}

async function search(req, res) {
  const from = req.query.from ? new Date(req.query.from) : undefined;
  const to = req.query.to ? new Date(req.query.to) : undefined;
  const origin = req.query.origin;
  const destination = req.query.destination;
  const flightClass = req.query.flightClass;
  const passengerCount = req.query.passengerCount ? parseInt(req.query.passengerCount) : 1;
  console.log(from)
  console.log(to)
  console.log(req.params.from)
  console.log(req.params.to)
  
  try {
    const flights = await flightService.search(from, to, origin, destination, flightClass, passengerCount);
    res.status(200).json(flights);
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
  create,
  findByFlightNumber,
  search
};
