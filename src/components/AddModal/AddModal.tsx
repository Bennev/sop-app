/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TAddModal } from "@/types/TAddModal";
import postCommitment from "@/services/commitment/postCommitment";
import { StyledDialogContent } from "./styles";
import { TCommitmentOrPaymentWithoutId } from "@/types/TCommitmentOrPayment";
import postPayment from "@/services/payment/postPayment";
const AddModal = ({
  entity,
  open,
  setOpen,
  refreshData,
  id,
}: TAddModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [commitmentOrPayment, setCommitment] = useState<TCommitmentOrPaymentWithoutId>({
    date: '',
    value: 0,
    note: '',
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const formattedValue = name === 'value' ? Number(value) : value;
    setCommitment((prev) => ({ ...prev, [name]: formattedValue }));
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setCommitment((prev) => ({ ...prev, [name]: date }));
  }

  const handleAdd = async () => {
    setIsSubmitted(true);

    const errors = [
      commitmentOrPayment.value <= 0 || String(commitmentOrPayment.value) === '',
      !commitmentOrPayment.date,
    ]
    if(errors.some((error) => error)) return enqueueSnackbar('Preencha os campos em vermelho corretamente', { variant: 'error' });
    const response = entity === 'Empenho' ? 
    await postCommitment(
      accessToken,
      { ...commitmentOrPayment, expense_id: id },
      enqueueSnackbar,
    ) : await postPayment(
      accessToken,
      { ...commitmentOrPayment, commitment_id: id },
      enqueueSnackbar,
    );
    if (!response) return;
    await refreshData();
    setOpen(false);
    setCommitment({
      date: '',
      value: 0,
      note: '',
    })
    setIsSubmitted(false);
  }

  const getErrorHelperText = (
    field: string | number,
    validationFn: (field: string | number) => boolean,
    errorMessage: string,
  ) => {
    const isError = isSubmitted && validationFn(field);
    return {
      error: isError,
      helperText: isError ? errorMessage : "",
    };
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Criar {entity}</DialogTitle>
      <StyledDialogContent>
        <TextField
          name="value"
          type="number"
          label="Valor"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          {...getErrorHelperText(commitmentOrPayment.value, (value) => Number(value) <= 0 || value === "", "O valor deve ser positivo")}
        />
        <DatePicker
          label="Data"
          onChange={(e) => handleDateChange(e, 'date')}
          slotProps={{
            textField: {
              ...getErrorHelperText(commitmentOrPayment.date, (date) => !date, "A data é obrigatória"),
            }
          }}  
        />
        <TextField
          name="note"
          type="text"
          label="Observação"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="inherit"
          >
            Fechar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAdd}
          >
            Criar
          </Button>
        </DialogActions>
      </StyledDialogContent>
    </Dialog>
  )
}

export default AddModal;