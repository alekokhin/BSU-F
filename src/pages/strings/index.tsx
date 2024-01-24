import { Add, EditTwoTone } from '@mui/icons-material'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getStrings } from 'api/strings'
import stringsBg from 'assets/images/strings.jpg'
import ItemCard from 'components/card'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { locales } from 'providers/locales'
import { useNavigate } from 'react-router-dom'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const Strings = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['strings'], getStrings)

  const $strings = data

  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-string')}
        />
      )}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${stringsBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.7,
          zIndex: -1,
          position: 'absolute',
        }}
      />
      {$strings ? (
        <Container
          sx={{
            minHeight: '90vh',
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
              {$strings.map(string => (
                <Grid
                  key={string.id}
                  item
                  xs={1}
                  sm={4}
                  md={4}
                  sx={{ display: 'grid', placeItems: 'center' }}
                >
                  <Box>
                    <ItemCard
                      onClick={() => {
                        navigate(`/string/${string.id}`)
                      }}
                      description={string.description}
                      title={string.title}
                      image={
                        `${REACT_APP_API_URL}${locales}/string/images/${string.images?.[0]}` ||
                        ''
                      } // Use optional chaining and provide a default value (an empty string)
                      id={string.id}
                    />
                    {isAuthenticated && (
                      <EditTwoTone
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/edit-string/${string.id}`)
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
    </>
  )
}
export default Strings
