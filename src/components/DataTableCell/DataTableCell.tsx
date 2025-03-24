import { TDataTableCell } from "@/types/TDataTableCell";
import { StyledActionButtons, StyledInfo } from "./styles";
import { Delete, Visibility } from "@mui/icons-material";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { TExpense } from "@/types/TExpense";
import { IconButton, Tooltip } from "@mui/material";

const DataTableCell = ({
  column_key,
  row,
  handleView,
  handleDelete,
}: TDataTableCell) => {
  const typeOptions = {
    BUILDING_CONSTRUCTION: "Obras de Edificação",
    ROAD_CONSTRUCTION: "Obra de Rodovias",
    OTHERS: "Outros",
  };

  const value = row[column_key as keyof TExpense];

  if (column_key === "actions") {
    return (
      <StyledActionButtons>
        <Tooltip title="Visualizar" color="primary" arrow>
          <IconButton onClick={() => handleView(row.id)}>
            <Visibility color="primary"/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir" color="error" arrow>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Delete color="error"/>
          </IconButton>
        </Tooltip>
      </StyledActionButtons>
    );
  }

  if (["protocol_date", "due_date"].includes(column_key)) {
    const date = new Date(value);
    const dateFormat = column_key === "protocol_date" ? "HH:mm dd/MM/yyyy" : "dd/MM/yyyy";
    return <StyledInfo>{format(date, dateFormat, { locale: ptBR })}</StyledInfo>;
  }

  if (column_key === "type") {
    const mappedType = typeOptions[value as keyof typeof typeOptions];
    return <StyledInfo>{mappedType}</StyledInfo>;
  }

  if (column_key === "value") {
    const number = Number(value);
    return <StyledInfo>R$ {number.toFixed(2).replace(".", ",")}</StyledInfo>;
  }

  return <StyledInfo>{value}</StyledInfo>;
}

export default DataTableCell;