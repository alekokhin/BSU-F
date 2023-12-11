import { LinkSharp } from '@mui/icons-material'
import { Box, ImageList, ImageListItem, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getString } from 'api/strings'
import { StringType } from 'api/strings'
import Header from 'components/header'
import ImageMagnifier from 'components/imageMagnifier'
import Loader from 'components/loader'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}
const String = () => {
  const { id } = useParams<Params>()
  const [string, setString] = useState<StringType>()

  const [selectedImage, setSelectedImage] = useState('')
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImageList
                      cols={0}
                      sx={{
                        width: '150px',
                        maxHeight: '600px',
                        justifyItems: 'center',
                        marginRight: '15px',
                      }}
                      variant="masonry"
                      gap={8}
                    >
                      {string?.images.map((image, index) => {
                        return (
                          <ImageListItem
                            key={index}
                            sx={{ justifyContent: 'center' }}
                          >
                            <Box
                              component="img"
                              src={image.image}
                              sx={{ width: '100px', justifyContent: 'center' }}
                              onClick={() => setSelectedImage(image.image)}
                              alt={`Item ${index}`}
                            />
                          </ImageListItem>
                        )
                      })}
                    </ImageList>
                    <ImageMagnifier
                      src={selectedImage || string.images[0].image}
                    />
                  </Box>
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
      )}{' '}
    </>
  )
}
export default String
