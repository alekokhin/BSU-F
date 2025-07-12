import { LinkSharp, Search } from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { AnalyzedTextType, getAnalyzedText } from 'api/analyzed-texts'
import textBg from 'assets/images/text.jpg'
import Header from 'components/header'
import Loader from 'components/loader'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
type Params = {
  id: string
}
const AnalyzedText = () => {
  const { id } = useParams<Params>()
  const [searchTerm, setSearchTerm] = useState('')
  const [analyzedText, setAnalyzedText] = useState<AnalyzedTextType>()
  const navigate = useNavigate()

  useQuery({
    queryKey: ['symbol', id],
    queryFn: () => getAnalyzedText(id!),
    onSuccess: data => {
      setAnalyzedText(data)
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
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${textBg})`,
        overflow: 'hidden',
      }}
    >
      <Header />

      {analyzedText ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto',
              height: '90dvh',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
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
                  {analyzedText.title}
                  {analyzedText.connection && (
                    <LinkSharp
                      sx={{ cursor: 'pointer' }}
                      onClick={() =>
                        window.open(
                          `/item/${analyzedText.connection}`,
                          '_blank',
                        )
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
              <Stack alignItems="center">
                <Box
                  sx={{
                    paddingBottom: '50px',
                    // bgcolor: '#f2b45854',
                    // backdropFilter: 'blur(2px)',
                  }}
                >
                  <Typography variant="h5">
                    {highlightSearchTerm(analyzedText.description)}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  )
}
export default AnalyzedText
