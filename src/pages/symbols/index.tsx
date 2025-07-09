import { Add, EditTwoTone } from '@mui/icons-material'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getSymbols } from 'api/symbols'
import symbolsBg from 'assets/images/symbols.jpg'
import ItemCard from 'components/card'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { locales } from 'providers/locales'
import { useNavigate } from 'react-router-dom'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const Symbols = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['symbols'], getSymbols)

  const $symbols = data

  return (
    <Box sx={{ height: '100vh', backgroundImage: `url(${symbolsBg})` }}>
      <Header />

      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer', padding: '20px', fontWeight: 'bolder' }}
          onClick={() => navigate('/new-symbol')}
        />
      )}
      {$symbols ? (
        <Container
          sx={{
            height: '90vh',
            width: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
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
                  sm={4}
                  md={4}
                  sx={{ display: 'grid', placeItems: 'center' }}
                >
                  <Box>
                    <ItemCard
                      onClick={() => {
                        navigate(`/symbol/${symbol.id}`)
                      }}
                      description={symbol.description}
                      title={symbol.title}
                      image={
                        `${REACT_APP_API_URL}${locales}/symbol/images/${symbol.images?.[0]}` ||
                        ''
                      } // Use optional chaining and provide a default value (an empty string)
                      id={symbol.id}
                    />
                    {isAuthenticated && (
                      <EditTwoTone
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/edit-symbol/${symbol.id}`)
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      ) : (
        <Loader />
      )}
    </Box>
  )
}
export default Symbols
