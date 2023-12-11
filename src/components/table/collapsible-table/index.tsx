import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

import { CollapsedRows } from '../table'
type TableProps = {
  isOpen: any
  data: CollapsedRows
}

const Row = ({ data, isOpen }: TableProps) => {
  const [open, setOpen] = useState(isOpen)
  const { row, collapsed } = data
  const { headers } = collapsed

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell size="small">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {row.map((cell, index) => (
          <TableCell key={index}>{cell}</TableCell>
        ))}
      </TableRow>

      <TableCell sx={{ p: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto">
          <Box sx={{ margin: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headers?.map(header => (
                    <TableCell key={header.key}>{header.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </>
  )
}
export default Row
