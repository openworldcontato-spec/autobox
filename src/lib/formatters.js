export const formatCurrency = (value, options = {}) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    ...options,
  }).format(Number(value || 0));
};

export const formatDateBR = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
};

export const PHONE_DISPLAY = '+55 (11) 4002-8922';
export const PHONE_TEL = '+551140028922';
