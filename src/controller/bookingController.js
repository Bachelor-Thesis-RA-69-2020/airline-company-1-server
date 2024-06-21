const bookingService = require('../service/bookingService');

async function book(req, res) {
  const bookingInformation = req.body;
  console.log('ok')
  try {
    await bookingService.bookAll(bookingInformation);
    res.status(201).json({ message: 'Bookings created.' });
  } catch (error) {
    msg = error.message
    if (msg.includes('flight number') || msg.includes('Validation')) {
      res.status(400).json({ error: msg });
    } else {
      res.status(500).json({ error: msg });
    }
  }
}

module.exports = {
    book
};
