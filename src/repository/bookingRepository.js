async function create(booking, options = {}) {
    return await booking.save({ options });
  }
  
  module.exports = {
      create
  };