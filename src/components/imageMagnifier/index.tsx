import { Box } from '@mui/material'
import { useState } from 'react'

type ImageMagnifierType = {
  src: string
  width?: string
  maxHeight?: number
  maxWidth?: number
  height?: string
  magnifierHeight?: number
  magnifieWidth?: number
  zoomLevel?: number
}
const ImageMagnifier = ({
  src,
  width,
  height,
  maxWidth = 500,
  maxHeight = 600,
  magnifierHeight = 300,
  magnifieWidth = 300,
  zoomLevel = 2,
}: ImageMagnifierType) => {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <Box
      sx={{
        position: 'relative',
        height: height,
        width: width,
      }}
    >
      <Box
        component="img"
        src={src}
        sx={{
          height: height,
          width: width,
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
        }}
        onMouseEnter={e => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget
          const { width, height } = elem.getBoundingClientRect()
          setSize([width, height])
          setShowMagnifier(true)
        }}
        onMouseMove={e => {
          // update cursor position
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset
          const y = e.pageY - top - window.pageYOffset
          setXY([x, y])
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false)
        }}
        alt={'img'}
      />

      <Box
        sx={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',

          // prevent maginier blocks the mousemove event of img
          pointerEvents: 'none',
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 10}px`,
          left: `${x + magnifieWidth / 4}px`,
          opacity: '1', // reduce opacity so you can verify position
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculete position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></Box>
    </Box>
  )
}
export default ImageMagnifier
