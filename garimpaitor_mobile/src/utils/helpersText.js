export const formatTextName = string => (string.toLowerCase().split(" ").map((string) => (string[0].toUpperCase() + string.substring(1))).join(" "));

export const formatTextUpperCase = string => string.toUpperCase();

export const formatMaskCnpj = cnpj => {
  cnpj = cnpj.length <= 18 ? cnpj : cnpj.slice(0, -1)
  return cnpj.replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
}

export const formatMaskCep = cep => {
  return cep.replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export const serializeCnpj = cnpj => {
  return cnpj.replace(/[^\d]+/g, '');
}
