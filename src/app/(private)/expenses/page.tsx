/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { StyledContainer, StyledInfoDetail, StyledInfoTopic, StyledLoading, StyledSection, StyledSpan, StyledTitle } from "./styles";
import DataTable from "@/components/DataTable/DataTable";
import { TExpense } from "@/types/TExpense";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { TExpenseColumns } from "@/types/TExpenseColumns";
import findOneExpense from "@/services/expense/findOneExpense";
import { expenseActions } from "@/redux/features/expenseSlice";
import findAllExpensesPaginated from "@/services/expense/findAllExpensesPaginated";
import { useRouter } from "next/navigation";
import AddExpenseModal from "@/components/Expense/AddExpenseModal/AddExpenseModal";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getAllExpensesPaginated = async () => {
    try {
      setIsLoading(true);
      const response = await findAllExpensesPaginated({
        accessToken: user.accessToken,
        page,
      });
      if (!response) return;
      setExpenses(response.content);
      setTotalPages(response.totalPages);
    } catch {
      enqueueSnackbar('Erro ao buscar todas as despesas', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = async (id: number) => {
    const response = await findOneExpense({ accessToken: user.accessToken, id });
    if (!response) return null;
    dispatch(expenseActions.setExpense(response))
    router.push(`/expenses/${id}`);
  }

  const handleDelete = () => {
    //TO DO
  }
  
  useEffect(() => {
    getAllExpensesPaginated();
  }, [page])

  console.log(page);

  return (
    <>
      {isLoading ? (
        <StyledLoading>
          <CircularProgress />
        </StyledLoading>
      ) : (
        <StyledContainer>
          <StyledSection>
            <StyledTitle>
              {'Olá, '}
              <StyledSpan>{user.name}</StyledSpan>
            </StyledTitle>
            <StyledInfoTopic>
              {'Email: '}
              <StyledInfoDetail>
                {user.login}
              </StyledInfoDetail>
            </StyledInfoTopic>
          </StyledSection>
          <StyledSection>
            <DataTable
              label={"Despesas"}
              columns={columns}
              data={expenses}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              labelAddButton="Adicionar Despesa"
              handleAdd={() => setOpenModal(true)}
              handleView={(id: number) => handleView(id)}
              handleDelete={(id: number) => handleDelete(id)}
            />
          </StyledSection>
        </StyledContainer>
      )}

      <AddExpenseModal
        open={openModal} setOpen={setOpenModal} />
    </>
  )
}