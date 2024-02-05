import { Box, ImageList as MuiImageList, ImageListItem } from '@mui/material'
import { isLocal } from 'components/form/validations'
import ImageMagnifier from 'components/imageMagnifier'
import { locales } from 'providers/locales'
import { useState } from 'react'

const REACT_APP_API_URL = isLocal
  ? process.env.REACT_APP_LOCAL_API_URL
  : process.env.REACT_APP_API_URL
type Images = { images: Array<any>; page: string }

const ImageList = ({ images, page }: Images) => {
  const [selectedImage, setSelectedImage] = useState('')

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MuiImageList
          cols={0}
          sx={{
            width: '150px',
            maxHeight: '400px',
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
                  src={`${REACT_APP_API_URL}${locales}/${page}/images/${image}`}
                  sx={{
                    width: '100px',
                    justifyContent: 'center',
                  }}
                  onClick={() =>
                    setSelectedImage(
                      `${REACT_APP_API_URL}${locales}/${page}/images/${image}`,
                    )
                  }
                  alt={`Item ${index}`}
                />
              </ImageListItem>
            )
          })}
        </MuiImageList>
        <Box
          height={400}
          width={300}
          border="1px solid black"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ImageMagnifier
            src={
              selectedImage ||
              `${REACT_APP_API_URL}${locales}/${page}/images/${images[0]}`
            }
          />
        </Box>
      </Box>
    </>
  )
}
export default ImageList
