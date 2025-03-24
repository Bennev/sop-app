/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { StyledContainer, StyledSection, StyledSpan, StyledSubTitle, StyledTitle } from "./styles";
import DataTable from "@/components/DataTable/DataTable";
import { TExpense } from "@/types/TExpense";
import { useEffect, useState } from "react";
import findAllExpenses from "@/services/expense/findAllExpenses";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { TExpenseColumns } from "@/types/TExpenseColumns";

export default function Expenses() {
  const columns: TExpenseColumns[] = [
    { key: 'id', label: 'Nº do Protocolo' },
    { key: 'type', label: 'Tipo' },
    { key: 'protocol_date', label: 'Data do Protocolo' },
    { key: 'due_date', label: 'Data de Vencimento' },
    { key: 'creditor', label: 'Credor' },
    { key: 'value', label: 'Valor' },
    { key: 'description', label: 'Descrição' },
  ];
  const user = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await findAllExpenses(user.accessToken);
      if (!response) return;
      setExpenses(response);
    } catch {
      enqueueSnackbar('Erro ao buscar todas as despesas', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id: number) => {
    //TO DO
  }

  const handleDelete = (id: number) => {
    //TO DO
  }
  
  useEffect(() => {
    getAllExpenses();
  }, [user.accessToken])

  return (
    <StyledContainer>
      <StyledSection>
        <StyledTitle>
          {'Olá, '}
          <StyledSpan>{user.name}</StyledSpan>
        </StyledTitle>
        <StyledSubTitle>Email: {user.login}</StyledSubTitle>
      </StyledSection>
      <StyledSection>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DataTable
            label={"Despesas"}
            columns={columns}
            data={expenses}
            handleView={(id: number) => handleView(id)}
            handleDelete={(id: number) => handleDelete(id)}
          />
        )}
      </StyledSection>
    </StyledContainer>
  )
}