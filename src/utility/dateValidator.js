const isFutureDate = (date, throwError = false) => {
    const now = new Date();
    const isFuture = date > now;

    if (!isFuture && throwError) {
        throw new Error('Validation: Must be a future date');
    }

    return isFuture;
};
  
module.exports = {
    isFutureDate,
};