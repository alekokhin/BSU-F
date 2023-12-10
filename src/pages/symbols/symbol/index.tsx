import { Box, ImageList, ImageListItem, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getSymbol, SymbolType } from 'api/symbols'
import Header from 'components/header'
import ImageMagnifier from 'components/imageMagnifier'
import Loader from 'components/loader'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}
const Symbol = () => {
  //hooks
  const { id } = useParams<Params>()
  const [symbol, setSymbol] = useState<SymbolType>()
  const navigate = useNavigate()

  const [selectedImage, setSelectedImage] = useState('')
  const { t } = useTranslation()
  useQuery({
    queryKey: ['symbol', id],
    queryFn: () => getSymbol(id!),
    onSuccess: data => {
      setSymbol(data)
    },
  })
  const list = symbol
    ? Object.entries(symbol)
        .filter(
          ([key, value]) =>
            value !== '' &&
            key !== 'images' &&
            key !== 'description' &&
            key !== 'title' &&
            key !== 'date' &&
            key !== 'id',
        )
        .map(([key, value]) => ({ key, value }))
    : []
  return (
    <>
      <Header />
      {symbol ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Typography variant="h4">{symbol.title}</Typography>
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
                    {symbol?.images.map((image, index) => {
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
                    src={selectedImage || symbol.images[0].image}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 400,
                      bgcolor: 'background.paper',
                      maxHeight: '600px',
                      overflow: 'auto',
                    }}
                  >
                    {list.map((detail, index) => (
                      <Box key={index}>
                        <Box fontWeight="bold">{t(`${detail.key}`) + ':'}</Box>

                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() =>
                            window.open(String(detail.value), '_blank')
                          }
                        >
                          {detail.value}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2">{symbol.description}</Typography>
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
export default Symbol
