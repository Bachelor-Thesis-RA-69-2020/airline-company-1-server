const crypto = require('crypto');

function hash(entry) {
    const hash = crypto.createHash('sha256')
      .update(entry)
      .digest('hex');
    
    return hash;
}

module.exports = {
    hash
};