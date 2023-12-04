import { Box, ImageList, ImageListItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getItem, ItemType } from 'api/items'
import ImageMagnifier from 'components/imageMagnifier'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}
const Item = () => {
  const { id } = useParams<Params>()
  const [item, setItem] = useState<ItemType>()
  const [selectedImage, setSelectedImage] = useState('')
  useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id!),
    onSuccess: data => {
      // eslint-disable-next-line no-console
      console.log(data)
      setItem(data)
    },
  })
  const navigate = useNavigate()
  return (
    <>
      {item && (
        <>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <ImageList
                cols={1}
                sx={{ width: '200px', justifyItems: 'center' }}
                gap={5}
                rowHeight={164}
              >
                {item.images.map((image, index) => {
                  return (
                    <ImageListItem key={index}>
                      <Box
                        component="img"
                        src={image.image}
                        sx={{ width: '100px' }}
                        onClick={() => setSelectedImage(image.image)}
                        alt={`Item ${index}`}
                      />
                    </ImageListItem>
                  )
                })}
              </ImageList>
              <ImageMagnifier
                src={selectedImage || item.images[0].image}
                width="400px"
              />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
export default Item
