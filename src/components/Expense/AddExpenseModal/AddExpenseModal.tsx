/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { StyledDates, StyledDialogContent } from "./styles";
import { TExpenseWithoutId } from "@/types/TExpense";
import { EExpenseType } from "@/enums/EExpenseType";
import { TAddExpenseModal } from "@/types/TAddExpenseModal";

const AddExpenseModal = ({
  open,
  setOpen,
}: TAddExpenseModal) => {
  const [expense, setExpense] = useState<TExpenseWithoutId>({
    type: EExpenseType.BUILDING_CONSTRUCTION,
    protocol_date: '',
    due_date: '',
    creditor: '',
    description: '',
    value: 0,
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setExpense({ ...expense, [name]: date });
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Adicionar Despesa</DialogTitle>
      <StyledDialogContent>
        <FormControl>
          <InputLabel variant="outlined" id="select">Tipo de Despesa</InputLabel>
          <Select
            name="type"
            labelId="select"
            value={expense.type}
            onChange={(e) => handleChange(e)}
            label="Tipo de Despesa"
          >
            
            <MenuItem value={EExpenseType.BUILDING_CONSTRUCTION}>Obra de Edificação</MenuItem>
            <MenuItem value={EExpenseType.ROAD_CONSTRUCTION}>Obra de Rodovias</MenuItem>
            <MenuItem value={EExpenseType.OTHERS}>Outros</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="creditor"
          type="text"
          label="Credor da Despesa"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="value"
          type="number"
          label="Valor da Despesa"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <StyledDates>
          <DateTimePicker
            label="Data do Protocolo"
            ampm={false}
            viewRenderers={{
              hours: null,
              minutes: null,
              seconds: null,
            }}
          />
          <DatePicker
            label="Data de Vencimento"
            onChange={(e) => handleDateChange(e, 'due_date')}
          />
        </StyledDates>
        <TextField
          name="description"
          type="text"
          label="Descrição da Despesa"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
      </StyledDialogContent>
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
          onClick={() => setOpen(false)}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddExpenseModal;