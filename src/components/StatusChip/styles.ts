import styled, { css } from "styled-components";
import { EExpenseStatus } from "@/enums/EExpenseStatus";
import { Chip } from "@mui/material";

export const StyledChip = styled(Chip)<{ status: EExpenseStatus }>`
  ${({ status }) => {
    switch (status) {
      case EExpenseStatus.WAITING_COMMITMENT:
        return css`
          background-color: #FF9800 !important;
          span {
            color: white;
          }
        `;
      case EExpenseStatus.PARTIALLY_COMMITTED:
        return css`
          background-color: #FFC107 !important;
          span {
            color: black;
          }
        `;
      case EExpenseStatus.WAITING_PAYMENT:
        return css`
          background-color: #FF5722 !important;
          span {
            color: white;
          }
        `;
      case EExpenseStatus.PARTIALLY_PAID:
        return css`
          background-color: #03A9F4 !important;
          span {
            color: white;
          }
        `;
      case EExpenseStatus.PAID:
        return css`
          background-color: #00501b !important;
          span {
            color: white;
          }
        `;
      default:
        return css`
          background-color: #9E9E9E !important;
          color: white;
        `;
    }
  }}
`;