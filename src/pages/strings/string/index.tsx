import { LinkSharp } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getString, StringType } from 'api/strings'
import stringBg from 'assets/images/string.jpg'
import Header from 'components/header'
import ImageList from 'components/imageList'
import Loader from 'components/loader'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}
const String = () => {
  const { id } = useParams<Params>()
  const [string, setString] = useState<StringType>()

  useQuery({
    queryKey: ['symbol', id],
    queryFn: () => getString(id!),
    onSuccess: data => {
      setString(data)
    },
  })

  return (
    <>
      <Header />

      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${stringBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.7,
          zIndex: -1,
          position: 'absolute',
        }}
      />
      {string ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Stack spacing={5} alignItems="center">
                <Typography variant="h4">
                  {string.title}
                  {string.connection && (
                    <LinkSharp
                      sx={{ cursor: 'pointer' }}
                      onClick={() => window.open(string.connection, '_blank')}
                    />
                  )}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <ImageList images={string?.images || []} page="string" />
                </Box>
              </Stack>
              <Box>
                <Typography variant="body2">{string.description}</Typography>
              </Box>
            </Stack>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default String
