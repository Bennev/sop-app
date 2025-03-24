"use client"
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { StyledContainer, StyledInfoDetail, StyledInfoTopic, StyledLoading, StyledSection, StyledTitle } from "../styles";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

export default function ExpenseDetails() {
  const expense = useSelector((state: RootState) => state.expense);
  const [isLoading, setIsLoading] = useState(false);

  const typeOptions = {
    BUILDING_CONSTRUCTION: "Obras de Edificação",
    ROAD_CONSTRUCTION: "Obra de Rodovias",
    OTHERS: "Outros",
  };

  return (
    isLoading ? (
      <StyledLoading>
        <CircularProgress />
      </StyledLoading>
    ) : (
      <StyledContainer>
        <StyledSection>
          <StyledTitle>
            {'Despesa: '}
            <StyledInfoDetail>{expense.id}</StyledInfoDetail>
            
          </StyledTitle>
          <StyledInfoTopic>
            {'Tipo: '}
            <StyledInfoDetail>
              {typeOptions[expense.type]}
            </StyledInfoDetail>
          </StyledInfoTopic>
          <StyledInfoTopic>
            {'Data do Protocolo: '}
            <StyledInfoDetail>
              {format(expense.protocol_date, 'HH:mm dd/MM/yyyy', { locale: ptBR })}
            </StyledInfoDetail>
          </StyledInfoTopic>
          <StyledInfoTopic>
            {'Data de Vencimento: '}
            <StyledInfoDetail>
              {format(expense.due_date, 'dd/MM/yyyy', { locale: ptBR })}
            </StyledInfoDetail>
          </StyledInfoTopic>
          <StyledInfoTopic>
            {'Credor: '}
            <StyledInfoDetail>
              {expense.creditor}
            </StyledInfoDetail>
          </StyledInfoTopic>
          <StyledInfoTopic>
            {'Valor: '}
            <StyledInfoDetail>
              R$ {expense.value.toFixed(2).replace(".", ",")}
            </StyledInfoDetail>
          </StyledInfoTopic>
          <StyledInfoTopic>
            {'Descrição: '}
            <StyledInfoDetail>
              {expense.description}
            </StyledInfoDetail>
          </StyledInfoTopic>
        </StyledSection>
      </StyledContainer>
    )
  )
}