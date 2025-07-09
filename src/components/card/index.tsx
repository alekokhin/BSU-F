import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

type Props = {
  title: string
  description: string
  image: string
  id: string
} & CardMediaProps

const ItemCard = ({ id, description, title, image, ...otherProps }: Props) => {
  return (
    <Card
      {...otherProps}
      sx={{
        width: { lg: '350px', xs: '280px' },
        height: { lg: '300px', xs: '250px' },
        marginBottom: '10px',
        cursor: 'pointer',
        bgcolor: '#f2b45854',
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 0px 20px #000',
        borderRadius: '15px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200px"
          image={image} // base64 image
          alt="image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontSize={{ xs: '20px', lg: '25px' }}
            component="div"
            fontFamily="bpg"
            fontWeight="bolder"
          >
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard
