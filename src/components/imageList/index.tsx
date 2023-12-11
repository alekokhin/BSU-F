import { Box, ImageList as MuiImageList, ImageListItem } from '@mui/material'
import ImageMagnifier from 'components/imageMagnifier'
import { useState } from 'react'
type Images = { images: Array<any> }

const ImageList = ({ images }: Images) => {
  const [selectedImage, setSelectedImage] = useState('')

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MuiImageList
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
          {images.map((image, index) => {
            return (
              <ImageListItem key={index} sx={{ justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={image.image}
                  sx={{
                    width: '100px',
                    justifyContent: 'center',
                  }}
                  onClick={() => setSelectedImage(image.image)}
                  alt={`Item ${index}`}
                />
              </ImageListItem>
            )
          })}
        </MuiImageList>
        <ImageMagnifier src={selectedImage || images[0].image} />
      </Box>
    </>
  )
}
export default ImageList
