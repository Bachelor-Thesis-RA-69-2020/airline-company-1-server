const airportService = require('../service/airportService');

async function findAll(req, res) {
  try {
    const airports = await airportService.findAll();
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function search(req, res) {
  const { search } = req.query;
  try {
    const airports = await airportService.search(search);
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    findAll,
    search
};
