export const toPriceFormat = (value, decimals = 2, currency = "$") =>
  `$ ${value.toFixed(2)}`;
