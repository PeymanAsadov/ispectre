export const COUNTRIES = [
  { id: "AZ", name: "Azərbaycan", dial: "+994", flag: "🇦🇿", groups: [3, 3, 2, 2] },
  { id: "RU", name: "Россия", dial: "+7", flag: "🇷🇺", groups: [3, 3, 2, 2] },
  { id: "US", name: "United States", dial: "+1", flag: "🇺🇸", groups: [3, 3, 4] },
  { id: "ES", name: "España", dial: "+34", flag: "🇪🇸", groups: [3, 2, 2, 2] },
];

export const PLACEHOLDERS = {
  AZ: "012 123 34 56",
  RU: "912 345 67 89",
  US: "212 555 0147",
  ES: "612 34 56 78",
};

export const getCountryById = (id) =>
  COUNTRIES.find((c) => c.id === id) || COUNTRIES[0];

export const totalDigits = (country) =>
  country.groups.reduce((a, b) => a + b, 0);

export const extractDigits = (country, rawValue) => {
  const digits = rawValue.replace(/\D/g, "");
  return digits.slice(0, totalDigits(country));
};

export const formatLocal = (country, digits) => {
  let result = "";
  let idx = 0;
  for (const len of country.groups) {
    const part = digits.slice(idx, idx + len);
    if (part) result += (result ? " " : "") + part;
    idx += len;
  }
  return result;
};

export const formatFull = (country, digits) => {
  const local = formatLocal(country, digits);
  return local ? `${country.dial} ${local}` : country.dial;
};

export const isCompletePhone = (country, digits) =>
  digits.length === totalDigits(country);

export const detectCountryFromPhone = (phone) => {
  if (!phone) return COUNTRIES[0];
  const found = COUNTRIES.find((c) => phone.startsWith(c.dial));
  return found || COUNTRIES[0];
};

export const extractDigitsFromFullPhone = (country, fullPhone) => {
  let digits = fullPhone.replace(/\D/g, "");
  const dialDigits = country.dial.replace(/\D/g, "");
  if (digits.startsWith(dialDigits)) digits = digits.slice(dialDigits.length);
  return digits.slice(0, totalDigits(country));
};