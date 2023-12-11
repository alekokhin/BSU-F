import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

export type RowPerPageOption = {
  value: string
  label: string
}

type PaginationProps = {
  rowsPerPageOptions: Array<RowPerPageOption>
  colSpan?: number
  count: number
  page: number
  size: string
  setPage: Dispatch<SetStateAction<number>>
  setSize: Dispatch<SetStateAction<string>>
}

export const TablePagination = (props: PaginationProps) => {
  const { count, page, size, setPage, setSize, rowsPerPageOptions = [] } = props

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeSize = (event: SelectChangeEvent<string>) => {
    setSize(event.target.value)
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Pagination
        color="secondary"
        defaultPage={1}
        page={page || 0}
        count={count}
        onChange={handleChangePage}
      />

      <Select variant="standard" value={size} onChange={handleChangeSize}>
        {rowsPerPageOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  )
}

//   return (
//   <MuiTablePagination
//     rowsPerPageOptions={rowsPerPageOptions}
//     colSpan={colSpan}
//     count={count}
//     page={page}
//     onPageChange={handleChangePage}
//     onRowsPerPageChange={handleChangeRowsPerPage}
//     {...restProps}
//   />
//   )
