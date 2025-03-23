/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { StyledDates, StyledDialogContent } from "./styles";
import { TExpense } from "@/types/TExpense";
import { EExpenseType } from "@/enums/EExpenseType";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState<TExpense>({
    id: 0,
    type: EExpenseType.BUILDING_CONSTRUCTION,
    protocol_date: new Date(),
    due_date: new Date(),
    creditor: '',
    description: '',
    value: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setExpense({ ...expense, [name]: date });
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        Adicionar Despesa
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
            <DatePicker
              label="Data do Protocolo"
              onChange={(e) => handleDateChange(e, 'protocol_date')}
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
          <Button variant="contained" onClick={() => setIsOpen(false)}>Fechar</Button>
          <Button variant="contained" onClick={() => setIsOpen(false)}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddExpense;