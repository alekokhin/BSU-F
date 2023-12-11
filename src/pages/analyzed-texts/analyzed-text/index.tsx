import { LinkSharp } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { AnalyzedTextType } from 'api/analyzed-texts'
import { getAnalyzedText } from 'api/analyzed-texts'
import Header from 'components/header'
import Loader from 'components/loader'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
type Params = {
  id: string
}
const AnalyzedText = () => {
  const { id } = useParams<Params>()
  const [analyzedText, setAnalyzedText] = useState<AnalyzedTextType>()

  useQuery({
    queryKey: ['symbol', id],
    queryFn: () => getAnalyzedText(id!),
    onSuccess: data => {
      setAnalyzedText(data)
    },
  })

  return (
    <>
      <Header />
      {analyzedText ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Stack spacing={5} alignItems="center">
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
                <Box>
                  <Typography variant="body2">
                    {analyzedText.description}
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
