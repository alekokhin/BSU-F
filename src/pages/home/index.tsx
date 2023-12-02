import { Container, Grid } from '@mui/material'
import Header from 'components/header'
const Home = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <Grid
          container
          // spacing={{ xs: 1, sm: 2, md: 5 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        ></Grid>
      </Container>
    </>
  )
}

export default Home
