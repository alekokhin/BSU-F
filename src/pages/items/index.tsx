import { Add, EditTwoTone } from '@mui/icons-material'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getItems } from 'api/items'
import ItemCard from 'components/card'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'

const Items = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['items'], getItems)

  const $items = data

  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add sx={{ cursor: 'pointer' }} onClick={() => navigate('/new-item')} />
      )}
      {$items ? (
        <Container sx={{ height: '90vh', width: '100%', overflow: 'auto' }}>
          <Stack spacing={{ xs: 2, sm: 6 }} marginTop={5}>
            <Grid
              container
              justifyContent="center"
              columns={{ xs: 1, sm: 8, md: 12 }}
            >
              {$items?.map(item => (
                <Grid
                  key={item.id}
                  item
                  gap={1}
                  xs={1}
                  sm={4}
                  md={4}
                  sx={{ display: 'grid', placeItems: 'center' }}
                >
                  <Box>
                    <ItemCard
                      onClick={() => {
                        navigate(`/item/${item.id}`)
                      }}
                      description={item.description}
                      title={item.title}
                      image={item.images?.[0]?.image || ''} // Use optional chaining and provide a default value (an empty string)
                      id={item.id}
                    />
                    {isAuthenticated && (
                      <EditTwoTone
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          navigate(`/edit-item/${item.id}`)
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
export default Items
