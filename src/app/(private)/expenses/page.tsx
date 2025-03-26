/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { StyledContainer, StyledInfoDetail, StyledInfoTopic, StyledLoading, StyledSection, StyledSpan, StyledTitle } from "./styles";
import DataTable from "@/components/DataTable/DataTable";
import { TExpense } from "@/types/TExpense";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import deleteExpense from "@/services/expense/deleteExpense";
import { TExpenseColumns } from "@/types/TColumns";
import findAllExpensesPaginated from "@/services/expense/findAllCommitmentsPaginatedByExpense";
import AddExpenseModal from "@/components/AddExpenseModal/AddExpenseModal";

export default function Expenses() {
  const columns: TExpenseColumns[] = [
    { key: 'protocol_number', label: 'Nº do Protocolo' },
    { key: 'type', label: 'Tipo' },
    { key: 'status', label: 'Status' },
    { key: 'protocol_date', label: 'Data do Protocolo' },
    { key: 'due_date', label: 'Data de Vencimento' },
    { key: 'creditor', label: 'Credor' },
    { key: 'value', label: 'Valor' },
    { key: 'description', label: 'Descrição' },
    { key: 'commitment_count', label: 'Qtd de Empenhos' },
  ];
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleView = async (id: number) => {
    router.push(`/expenses/${id}`);
  }

  const handleDelete = async (id: number) => {
    const response = await deleteExpense(user.accessToken, id, enqueueSnackbar);
    if (!response) return null;
    enqueueSnackbar('Despesa deletada com sucesso', { variant: 'success' });
    setPage(0);
    getAllExpensesPaginated();
  }

  const getAllExpensesPaginated = async () => {
    try {
      setIsLoading(true);
      const response = await findAllExpensesPaginated({
        accessToken: user.accessToken,
        page,
      });
      if (!response) return;
      setExpenses(response.content as TExpense[]);
      setTotalPages(response.totalPages);
    } catch {
      enqueueSnackbar('Erro ao buscar todas as despesas', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getAllExpensesPaginated();
  }, [page])

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
              !
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
              labelAddButton="Criar Despesa"
              handleAdd={() => setOpenModal(true)}
              handleView={(id: number) => handleView(id)}
              handleDelete={(id: number) => handleDelete(id)}
            />
          </StyledSection>
        </StyledContainer>
      )}

      <AddExpenseModal
        open={openModal}
        setOpen={setOpenModal}
        refreshData={getAllExpensesPaginated}
      />
    </>
  )
}