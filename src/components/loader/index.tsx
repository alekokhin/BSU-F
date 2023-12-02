import { CircularProgress, Container } from '@mui/material'

const Loader = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <CircularProgress />
    </Container>
  )
}
export default Loader
