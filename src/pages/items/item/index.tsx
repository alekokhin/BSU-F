/* eslint-disable no-console */
import {
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getItem, ItemType } from 'api/items'
import Header from 'components/header'
import ImageMagnifier from 'components/imageMagnifier'
import Loader from 'components/loader'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}
const Item = () => {
  const { id } = useParams<Params>()
  const [item, setItem] = useState<ItemType>()
  const [selectedImage, setSelectedImage] = useState('')
  const { t } = useTranslation()
  useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id!),
    onSuccess: data => {
      setItem(data)
    },
  })
  const navigate = useNavigate()
  const list = item
    ? Object.entries(item)
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
  list.map(i => console.log(i))
  return (
    <>
      <Header />
      {item ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
                    {item.images.map((image, index) => {
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
                  <ImageMagnifier src={selectedImage || item.images[0].image} />
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
                        <Box fontWeight="bold">
                          {t(
                            `item${
                              detail.key.charAt(0).toUpperCase() +
                              detail.key.slice(1)
                            }`,
                          ) + ':'}
                        </Box>
                        <Box>{String(detail.value)}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2">{item.description}</Typography>
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
export default Item
