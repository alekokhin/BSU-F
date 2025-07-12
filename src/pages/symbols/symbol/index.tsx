import { LinkSharp, Search } from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getSymbol, SymbolType } from 'api/symbols'
import symbolBg from 'assets/images/symbol.jpg'
import Header from 'components/header'
import ImageList from 'components/imageList'
import Loader from 'components/loader'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}
const Symbol = () => {
  //hooks
  const { id } = useParams<Params>()
  const [searchTerm, setSearchTerm] = useState('')

  const [symbol, setSymbol] = useState<SymbolType>()

  useQuery({
    queryKey: ['symbol', id],
    queryFn: () => getSymbol(id!),
    onSuccess: data => {
      setSymbol(data)
    },
  })

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) {
      return text
    }

    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part,
      )
  }
  return (
    <Box sx={{ height: '100vh', backgroundImage: `url(${symbolBg})` }}>
      <Header />

      {symbol ? (
        <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
          >
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'sticky',
                }}
              >
                <Typography variant="h4">
                  {symbol.title}
                  {symbol.connection && (
                    <LinkSharp
                      sx={{ cursor: 'pointer', paddingLeft: '5px' }}
                      onClick={() =>
                        window.open(`/item/${symbol.connection}`, '_blank')
                      }
                    />
                  )}
                </Typography>
                <TextField
                  sx={{ height: '30px' }}
                  value={searchTerm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    style: {
                      borderWidth: '2px',
                      borderRadius: '30px',
                      backgroundColor: '#fff',
                    },
                  }}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Box>
              <Stack spacing={5} alignItems="center">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <ImageList images={symbol?.images || []} page="symbol" />
                </Box>
              </Stack>
              <Box>
                <Typography variant="body2">
                  {highlightSearchTerm(symbol.description)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  )
}
export default Symbol
