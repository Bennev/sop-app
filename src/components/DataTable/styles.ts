import { Button, Pagination, TableCell } from "@mui/material";
import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLabel = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const StyledButton = styled(Button)`
  height: 40px;
`;

export const StyledTableCell = styled(TableCell)<{cell_key: string}>`
  max-width: 250px;
  ${({ cell_key }) => cell_key === 'id' && css`
    max-width: 170px;
  `}

  ${({ cell_key }) => cell_key === 'type' && css`
    max-width: 180px;
  `}

  ${({ cell_key }) => cell_key === 'protocol_date' && css`
    max-width: 190px;
  `}

  ${({ cell_key }) => cell_key === 'due_date' && css`
    max-width: 200px;
  `}
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  align-self: center;
`;