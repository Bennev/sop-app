import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateString?: string, dateFormat = 'dd/MM/yyyy') => {
  if (!dateString) return 'Data não disponível';

  const date = parseISO(dateString);
  if (!isValid(date)) return 'Data inválida';

  return format(date, dateFormat, { locale: ptBR });
};