async function create(ticket, options = {}) {
  return await ticket.save({ options });
}

module.exports = {
    create
};
