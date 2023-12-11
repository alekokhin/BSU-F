import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Box,
  IconButton,
  Skeleton,
  Table as MuiTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps as MuiTableProps,
  TableRow,
} from '@mui/material'
import { Checkbox } from 'components/form/basic/checkbox'
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Row from '../collapsible-table'
import { RowPerPageOption, TablePagination } from '../pagination'

export type Column = {
  title: string
  key: string
}

type Pagination = {
  topPagination?: boolean
  bottomPagination?: boolean
  size: string
  page: number
  setPage: any
  setSize: any
  rowsPerPage: number
  count: number
  rowsPerPageOptions: Array<RowPerPageOption>
}
export type CollapsedRows = {
  row: Array<string | number | ReactNode>
  collapsed: {
    headers: Array<Column>
    row: Array<string | number | ReactNode>
  }
}
type StandardRow = {
  type: 'standard'
  rows: Array<Array<string | number | ReactNode>>
}
type CollapseRows = {
  type: 'collapsed'
  rows: Array<CollapsedRows>
}

type TableProps = {
  rowClickRoute?: string
  isLoading?: boolean
  checkable?: boolean
  headers: Array<Column>
  pagination?: Pagination
} & (CollapseRows | StandardRow) &
  MuiTableProps

export const MyTable = ({
  rowClickRoute,
  headers,
  isLoading,
  rows,
  pagination,
  checkable,
  type,
}: TableProps) => {
  const [allRowsOpen, setAllRowsOpen] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [selected, setSelected] = useState(selectAll)
  const navigate = useNavigate()

  const handleClick = () => {
    setSelectAll(!selectAll)
  }

  return (
    <TableContainer
      sx={{ width: { xs: '100%', sm: '90%' }, maxHeight: '500px' }}
    >
      <Table size="small">
        {pagination?.topPagination && (
          <Box>
            <TablePagination
              size={pagination.size}
              rowsPerPageOptions={pagination.rowsPerPageOptions}
              colSpan={headers?.length}
              count={pagination.count || 0}
              page={pagination.page}
              setSize={pagination.setSize}
              setPage={pagination.setPage}
            />
          </Box>
        )}
        <MuiTable stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {checkable && (
                <TableCell>
                  <Checkbox onClick={handleClick} />
                </TableCell>
              )}
              {type === 'collapsed' && (
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setAllRowsOpen(!allRowsOpen)
                    }}
                  >
                    {allRowsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
              )}
              {headers?.map(header => (
                <TableCell size="small" key={header.key}>
                  {header.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: pagination?.rowsPerPage || 10 }).map(
                  (_, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      {headers?.map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton variant="rectangular" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )
              : // eslint-disable-next-line unicorn/no-nested-ternary
              type === 'collapsed'
              ? rows.map((row, index) => (
                  <Row key={index} data={row} isOpen={allRowsOpen} />
                ))
              : rows.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() =>
                      rowClickRoute && navigate(rowClickRoute + row[0])
                    }
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                    }}
                  >
                    {checkable && (
                      <TableCell>
                        <Checkbox
                          onClick={() => setSelected(!selected)}
                          checked={selected}
                        />
                      </TableCell>
                    )}
                    {row.map((cell, i) => {
                      if (i !== 0) {
                        return <TableCell key={index + i}>{cell}</TableCell>
                      }
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </MuiTable>
        {pagination?.bottomPagination && (
          <Box>
            <TablePagination
              rowsPerPageOptions={pagination.rowsPerPageOptions}
              colSpan={headers?.length}
              count={pagination.count || 0}
              page={pagination.page}
              size={pagination.size}
              setSize={pagination.setSize}
              setPage={pagination.setPage}
            />
          </Box>
        )}
      </Table>
    </TableContainer>
  )
}
