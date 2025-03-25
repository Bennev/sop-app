/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { StyledContainer, StyledInfoDetail, StyledInfoTopic, StyledLoading, StyledSection, StyledTitle } from "../../../styles";
import { TCommitmentOrPaymentColumns } from "@/types/TColumns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSnackbar } from "notistack";
import { TCommitmentOrPayment } from "@/types/TCommitmentOrPayment";
import deletePayment from "@/services/payment/deletePayment";
import findAllPaymentsPaginatedByCommitment from "@/services/payment/findAllPaymentsPaginatedByCommitment";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DataTable from "@/components/DataTable/DataTable";
import AddModal from "@/components/AddModal/AddModal";

export default function CommitmentDetails() {
  const columns: TCommitmentOrPaymentColumns[] = [
    { key: 'payment_number', label: 'Nº do Pagamento' },
    { key: 'date', label: 'Data' },
    { key: 'value', label: 'Valor' },
    { key: 'note', label: 'Observação' },
  ];
  const commitment = useSelector((state: RootState) => state.commitment);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [payments, setPayments] = useState<TCommitmentOrPayment[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    const response = await deletePayment(accessToken, id, enqueueSnackbar);
    if (!response) return null;
    enqueueSnackbar('Empenho deletado com sucesso', { variant: 'success' });
    setPage(0);
    getAllPaymentsPaginatedByCommitment();
  }

  const getAllPaymentsPaginatedByCommitment = async () => {
    try {
      setIsLoading(true);
      const response = await findAllPaymentsPaginatedByCommitment(
        accessToken,
        commitment.id,
        page,
      );
      if (!response) return;
      setPayments(response.content as TCommitmentOrPayment[]);
      setTotalPages(response.totalPages);
    } catch {
      enqueueSnackbar('Erro ao buscar os pagamentos desse empenho', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPaymentsPaginatedByCommitment();
  }, [commitment.id, page])
  
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
              {'Empenho: '}
              <StyledInfoDetail>{commitment.commitment_number}</StyledInfoDetail>
              
            </StyledTitle>
            <StyledInfoTopic>
              {'Data: '}
              <StyledInfoDetail>
                {format(commitment.date, 'dd/MM/yyyy', { locale: ptBR })}
              </StyledInfoDetail>
            </StyledInfoTopic>
            <StyledInfoTopic>
              {'Valor: '}
              <StyledInfoDetail>
                R$ {commitment.value.toFixed(2).replace(".", ",")}
              </StyledInfoDetail>
            </StyledInfoTopic>
            <StyledInfoTopic>
              {'Observação: '}
              <StyledInfoDetail>
                {commitment.note}
              </StyledInfoDetail>
            </StyledInfoTopic>
          </StyledSection>
          <StyledSection>
              <DataTable
                label={"Pagamentos"}
                columns={columns}
                data={payments}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                labelAddButton="Criar Pagamento"
                handleAdd={() => setOpenModal(true)}
                handleDelete={(id: number) => handleDelete(id)}
              />
            </StyledSection>
        </StyledContainer>
      )}

      <AddModal
        entity="Pagamento"
        open={openModal}
        setOpen={setOpenModal}
        refreshData={getAllPaymentsPaginatedByCommitment}
        id={commitment.id}
      />
    </>
  );
}