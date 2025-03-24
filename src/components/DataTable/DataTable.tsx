import { TDataTable } from "@/types/TDataTable";
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledButton, StyledContainer, StyledHeader, StyledLabel, StyledPagination, StyledTableCell } from "./styles";
import DataTableCell from "../DataTableCell/DataTableCell";
import { Add } from "@mui/icons-material";

const DataTable = ({
  label,
  columns,
  data,
  totalPages,
  page,
  setPage,
  labelAddButton,
  handleAdd,
  handleView,
  handleDelete,
}: TDataTable) => {

  const columnsToShow = [
    ...columns,
    { key: 'actions', label: 'Ações' },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLabel>{label}</StyledLabel>
        <StyledButton
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          {labelAddButton}
        </StyledButton>
      </StyledHeader>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columnsToShow.map((column) => (
                  <StyledTableCell
                    key={column.key}
                    align="left"
                    size="small"
                    style={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      fontFamily: 'Lexend',
                      color: '#00501b'
                    }}
                    cell_key={column.key}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
              >
                {columnsToShow.map((column) => (
                  <StyledTableCell
                    size="small"
                    key={column.key}
                    align="left"
                    style={{
                      fontWeight: 400,
                      fontSize: '1',
                      fontFamily: 'Lexend',
                    }}
                    cell_key={column.key}
                  >
                    <DataTableCell
                      column_key={column.key}
                      row={row}
                      handleView={handleView}
                      handleDelete={handleDelete}
                    />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledPagination
        color="primary"
        count={totalPages}
        page={page + 1}
        onChange={(_, page) => setPage(page - 1)}
      />
    </StyledContainer>
  )

}

export default DataTable;