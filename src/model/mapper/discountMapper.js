const { Discount } = require('../domain/Discount');

function fromDTO(discountDTO) {
  return Discount.build({
    validFrom: discountDTO.validFrom,
    validTo: discountDTO.validTo,
    percentage: discountDTO.percentage,
  });
}

module.exports = {
  fromDTO
};
