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
import { TCommitmentOrPaymentWithoutIdAndNumber } from "@/types/TCommitmentOrPayment";
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
  const [commitmentOrPayment, setCommitmentOrPayment] = useState<TCommitmentOrPaymentWithoutIdAndNumber>({
    date: '',
    value: 0,
    note: '',
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const formattedValue = name === 'value' ? Number(value) : value;
    setCommitmentOrPayment((prev) => ({ ...prev, [name]: formattedValue }));
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setCommitmentOrPayment((prev) => ({ ...prev, [name]: date }));
  }

  const handleAdd = async () => {
    setIsSubmitted(true);

    const errors = [
      commitmentOrPayment.value <= 0 || String(commitmentOrPayment.value) === '',
      !commitmentOrPayment.date || isNaN(new Date(commitmentOrPayment.date).getTime()),
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
    setCommitmentOrPayment({
      date: '',
      value: 0,
      note: '',
    })
    setIsSubmitted(false);
  }

  const handleClose = () => {
    setOpen(false);
    setCommitmentOrPayment({
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
      onClose={handleClose}
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
          onChange={handleChange}
          {...getErrorHelperText(
            commitmentOrPayment.value,
            (value) => Number(value) <= 0 || value === "",
            "O valor deve ser positivo"
          )}
        />
        <DatePicker
          label="Data"
          onChange={(e) => handleDateChange(e, 'date')}
          slotProps={{
            textField: {
              ...getErrorHelperText(
                commitmentOrPayment.date,
                (date) => !date || isNaN(new Date(date).getTime()),
                "A data é obrigatória e precisa ser válida"
              ),
            }
          }}  
        />
        <TextField
          name="note"
          type="text"
          label="Observação"
          variant="outlined"
          onChange={handleChange}
        />
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
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