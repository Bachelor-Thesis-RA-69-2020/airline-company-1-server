async function create(discount) {
    return await discount.save();
  }
  
  module.exports = {
      create
  };
  