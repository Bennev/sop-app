/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { StyledContainer, StyledInfoDetail, StyledInfoRow, StyledInfoTopic, StyledLoading, StyledSection, StyledTitle } from "../styles";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import DataTable from "@/components/DataTable/DataTable";
import { useSnackbar } from "notistack";
import findAllCommitmentsPaginatedByExpense from "@/services/commitment/findAllCommitmentsPaginated";
import deleteCommitment from "@/services/commitment/deleteCommitment";
import findOneCommitment from "@/services/commitment/findOneCommitment";
import { commitmentActions } from "@/redux/features/commitmentSlice";
import { useRouter } from "next/navigation";
import { TCommitmentOrPaymentColumns } from "@/types/TColumns";
import { TCommitmentOrPayment } from "@/types/TCommitmentOrPayment";
import AddModal from "@/components/AddModal/AddModal";

export default function ExpenseDetails() {
  const columns: TCommitmentOrPaymentColumns[] = [
    { key: 'commitment_number', label: 'Nº do Empenho' },
    { key: 'date', label: 'Data' },
    { key: 'value', label: 'Valor' },
    { key: 'note', label: 'Observação' },
    { key: 'payment_count', label: 'Qtd de Pagamentos' },
  ];
  const expense = useSelector((state: RootState) => state.expense);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [commitments, setCommitments] = useState<TCommitmentOrPayment[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const typeOptions = {
    BUILDING_CONSTRUCTION: "Obras de Edificação",
    ROAD_CONSTRUCTION: "Obra de Rodovias",
    OTHERS: "Outros",
  };

  const handleView = async (id: number) => {
    const response = await findOneCommitment(user.accessToken, id);
    if (!response) return null;
    dispatch(commitmentActions.setCommitment(response))
    router.push(`/expenses/${expense.id}/commitments/${id}`);
  }

  const handleDelete = async (id: number) => {
    const response = await deleteCommitment(user.accessToken, id, enqueueSnackbar);
    if (!response) return null;
    enqueueSnackbar('Empenho deletado com sucesso', { variant: 'success' });
    setPage(0);
    getAllCommitmentsPaginatedByExpense();
  }

  const getAllCommitmentsPaginatedByExpense = async () => {
      try {
        setIsLoading(true);
        const response = await findAllCommitmentsPaginatedByExpense(
          user.accessToken,
          expense.id,
          page,
        );
        if (!response) return;
        setCommitments(response.content as TCommitmentOrPayment[]);
        setTotalPages(response.totalPages);
      } catch {
        enqueueSnackbar('Erro ao buscar os empenhos dessa despesa', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    getAllCommitmentsPaginatedByExpense();
  }, [expense.id, page])

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
              {'Despesa: '}
              <StyledInfoDetail>{expense.protocol_number}</StyledInfoDetail>
              
            </StyledTitle>
            <StyledInfoRow>
              <StyledInfoTopic>
                {'Tipo: '}
                <StyledInfoDetail>
                  {typeOptions[expense.type]}
                </StyledInfoDetail>
              </StyledInfoTopic>
              <StyledInfoTopic>
              {'Credor: '}
              <StyledInfoDetail>
                {expense.creditor}
              </StyledInfoDetail>
            </StyledInfoTopic>
            </StyledInfoRow>
            <StyledInfoRow>
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
            </StyledInfoRow>
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
          <StyledSection>
              <DataTable
                label={"Empenhos"}
                columns={columns}
                data={commitments}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                labelAddButton="Criar Empenho"
                handleAdd={() => setOpenModal(true)}
                handleView={(id: number) => handleView(id)}
                handleDelete={(id: number) => handleDelete(id)}
              />
            </StyledSection>
        </StyledContainer>
      )}

      <AddModal
        entity="Empenho"
        open={openModal}
        setOpen={setOpenModal}
        refreshData={getAllCommitmentsPaginatedByExpense}
        id={expense.id}
      />
    </>
  )
}