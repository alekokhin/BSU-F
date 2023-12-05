import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../providers/auth'
type Props = {
  title: string
  description: string
  image: string
  id: string
}
const ItemCard = (item: Props) => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        width: { lg: '350px', xs: '280px' },
        height: { lg: '300px', xs: '250px' },
        marginBottom: '10px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.image} //base64 image
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ItemCard
