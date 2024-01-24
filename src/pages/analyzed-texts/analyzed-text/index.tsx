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
import { useParams } from 'react-router-dom'
type Params = {
  id: string
}
const AnalyzedText = () => {
  const { id } = useParams<Params>()
  const [searchTerm, setSearchTerm] = useState('')
  const [analyzedText, setAnalyzedText] = useState<AnalyzedTextType>()

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
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${textBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // background: 'inherit',
          // filter: 'blur(2px)',
          opacity: 0.7,
          zIndex: -1,
          position: 'absolute',
        }}
      />
      {analyzedText ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                        window.open(analyzedText.connection, '_blank')
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
                <Box>
                  <Typography variant="body2">
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
    </>
  )
}
export default AnalyzedText
