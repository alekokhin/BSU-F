import { Add } from '@mui/icons-material'
import { Container, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getSymbols } from 'api/symbols'
import ItemCard from 'components/card'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const Symbols = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['symbols'], getSymbols)
  // eslint-disable-next-line no-console
  console.log(data)
  const $symbols = data

  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-symbol')}
        />
      )}
      {$symbols ? (
        <Container sx={{ height: '90vh', width: '100%' }}>
          <Stack spacing={{ xs: 2, sm: 6 }} marginTop={5}>
            <Grid
              container
              justifyContent="center"
              columns={{ xs: 1, sm: 8, md: 12 }}
            >
              {$symbols.map(symbol => (
                <Grid
                  key={symbol.id}
                  item
                  xs={1}
                  onClick={() => {
                    isAuthenticated
                      ? navigate(`/edit-symbol/${symbol.id}`)
                      : navigate(`/symbol/${symbol.id}`)
                  }}
                  sm={4}
                  md={4}
                  sx={{ display: 'grid', placeItems: 'center' }}
                >
                  <ItemCard
                    description={symbol.description}
                    title={symbol.title}
                    image={symbol.images?.[0].images || ''} // Use optional chaining and provide a default value (an empty string)
                    id={symbol.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default Symbols
