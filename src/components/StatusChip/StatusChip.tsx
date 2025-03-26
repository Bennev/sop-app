import { EExpenseStatus } from "@/enums/EExpenseStatus";
import { StyledChip } from "./styles";

const StatusChip = ({ status }: { status: EExpenseStatus }) => {
    let label = '';
    switch (status) {
      case EExpenseStatus.WAITING_COMMITMENT:
        label = 'Aguardando Empenho';
        break;
      case EExpenseStatus.PARTIALLY_COMMITTED:
        label = 'Parcialmente Empenhada';
        break;
      case EExpenseStatus.WAITING_PAYMENT:
        label = 'Aguardando Pagamento';
        break;
      case EExpenseStatus.PARTIALLY_PAID:
        label = 'Parcialmente Paga';
        break;
      case EExpenseStatus.PAID:
        label = 'Paga';
        break;
      default:
        label = '';
    }
  
    return <StyledChip label={label} status={status} />;
};

export default StatusChip;