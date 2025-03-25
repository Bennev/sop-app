/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { StyledDates, StyledDialogContent } from "./styles";
import { TExpenseWithoutIdAndProtocolNumber } from "@/types/TExpense";
import { EExpenseType } from "@/enums/EExpenseType";
import { useSnackbar } from "notistack";
import postExpense from "@/services/expense/postExpense";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TAddExpenseModal } from "@/types/TAddExpenseModal";

const AddExpenseModal = ({
  open,
  setOpen,
  refreshData,
}: TAddExpenseModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [expense, setExpense] = useState<TExpenseWithoutIdAndProtocolNumber>({
    type: EExpenseType.BUILDING_CONSTRUCTION,
    protocol_date: '',
    due_date: '',
    creditor: '',
    description: '',
    value: 0,
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const formattedValue = name === 'value' ? Number(value) : value;
    setExpense((prev) => ({ ...prev, [name]: formattedValue }));
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setExpense((prev) => ({ ...prev, [name]: date }));
  }

  const handleAddExpense = async () => {
    setIsSubmitted(true);

    const errors = [
      expense.creditor === "",
      expense.value <= 0 || String(expense.value) === '',
      !expense.protocol_date,
      !expense.due_date,
    ]
    if(errors.some((error) => error)) return enqueueSnackbar('Preencha os campos em vermelho corretamente', { variant: 'error' });
    const response = await postExpense(accessToken, expense);
    if (!response) return enqueueSnackbar('Erro ao adicionar despesa', { variant: 'error' });
    enqueueSnackbar('Despesa criada com sucesso', { variant: 'success' });
    await refreshData();
    setOpen(false);
    setExpense({
      type: EExpenseType.BUILDING_CONSTRUCTION,
      protocol_date: '',
      due_date: '',
      creditor: '',
      description: '',
      value: 0,
    })
    setIsSubmitted(false);
  }

  const handleClose = () => {
    setOpen(false);
    setExpense({
      type: EExpenseType.BUILDING_CONSTRUCTION,
      protocol_date: '',
      due_date: '',
      creditor: '',
      description: '',
      value: 0,
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
      <DialogTitle>Criar Despesa</DialogTitle>
      <StyledDialogContent>
        <FormControl>
          <InputLabel variant="outlined" id="select">Tipo</InputLabel>
          <Select
            name="type"
            labelId="select"
            value={expense.type}
            onChange={handleChange}
            label="Tipo"
          >
            
            <MenuItem value={EExpenseType.BUILDING_CONSTRUCTION}>Obra de Edificação</MenuItem>
            <MenuItem value={EExpenseType.ROAD_CONSTRUCTION}>Obra de Rodovias</MenuItem>
            <MenuItem value={EExpenseType.OTHERS}>Outros</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="creditor"
          type="text"
          label="Credor"
          variant="outlined"
          onChange={handleChange}
          {...getErrorHelperText(expense.creditor, (value) => value === "", "O credor é obrigatório")}
        />
        <TextField
          name="value"
          type="number"
          label="Valor"
          variant="outlined"
          onChange={handleChange}
          {...getErrorHelperText(expense.value, (value) => Number(value) <= 0 || value === "", "O valor deve ser positivo")}
        />
        <StyledDates>
          <DateTimePicker
            label="Data do Protocolo"
            onChange={(e) => handleDateChange(e, 'protocol_date')}
            ampm={false}
            viewRenderers={{
              hours: null,
              minutes: null,
              seconds: null,
            }}
            slotProps={{
              textField: {
                ...getErrorHelperText(
                  expense.protocol_date,
                  (date) => !date || isNaN(new Date(date).getTime()),
                  "A data do protocolo é obrigatória e precisa ser válida"
                ),
              }
            }}  
          />
          <DatePicker
            label="Data de Vencimento"
            onChange={(e) => handleDateChange(e, 'due_date')}
            slotProps={{
              textField: {
                ...getErrorHelperText(
                  expense.due_date,
                  (date) => !date || isNaN(new Date(date).getTime()),
                  "A data de vencimento é obrigatória e precisa ser válida"
                ),
              }
            }}  
          />
        </StyledDates>
        <TextField
          name="description"
          type="text"
          label="Descrição"
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
            onClick={handleAddExpense}
          >
            Criar
          </Button>
        </DialogActions>
      </StyledDialogContent>
    </Dialog>
  )
}

export default AddExpenseModal;