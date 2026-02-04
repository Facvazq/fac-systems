const DEFAULT_USD_PRICE = 10;

const COUNTRY_CURRENCY = {
  US: { currency: 'USD', locale: 'en-US', rate: 1 },
  CA: { currency: 'CAD', locale: 'en-CA', rate: 1.35 },
  AR: { currency: 'ARS', locale: 'es-AR', rate: 1000 },
  AU: { currency: 'AUD', locale: 'en-AU', rate: 1.52 },
  GB: { currency: 'GBP', locale: 'en-GB', rate: 0.78 },
  DE: { currency: 'EUR', locale: 'de-DE', rate: 0.92 },
  FR: { currency: 'EUR', locale: 'fr-FR', rate: 0.92 },
  AE: { currency: 'AED', locale: 'ar-AE', rate: 3.67 }
};

const getEntryForCountry = (countryCode) => {
  if (!countryCode) return COUNTRY_CURRENCY.US;
  return COUNTRY_CURRENCY[countryCode] || COUNTRY_CURRENCY.US;
};

const CURRENCY_FALLBACK_PREFIX = {
  USD: 'US$',
  CAD: 'CA$',
  AUD: 'A$',
  ARS: 'ARS'
};

export const formatPriceFromUsd = (usd = DEFAULT_USD_PRICE, countryCode) => {
  const entry = getEntryForCountry(countryCode);
  const value = usd * entry.rate;
  const fractionDigits = entry.currency === 'ARS' ? 0 : 2;
  const currencyDisplay = entry.currency === 'ARS' ? 'code' : 'narrowSymbol';

  const currencyFormatter = new Intl.NumberFormat(entry.locale, {
    style: 'currency',
    currency: entry.currency,
    currencyDisplay,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  });

  const fallbackPrefix = CURRENCY_FALLBACK_PREFIX[entry.currency];
  if (!fallbackPrefix) {
    return currencyFormatter.format(value);
  }

  const numberOnly = new Intl.NumberFormat(entry.locale, {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);

  return `${fallbackPrefix} ${numberOnly}`;
};

export const getDefaultUsdPrice = () => DEFAULT_USD_PRICE;
