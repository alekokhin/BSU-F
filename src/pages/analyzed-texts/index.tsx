import { Add, EditTwoTone } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getAnalyzedTexts } from 'api/analyzed-texts'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const AnalyzedTexts = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['analyzedTexts'], getAnalyzedTexts)

  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-analyzed-text')}
        />
      )}
      {data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box width="90%">
            {data.map((detail, index) => (
              <Box
                key={index}
                fontSize="50px"
                sx={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/analyzed-text/${detail.id}`)
                  }}
                >
                  {detail.title}
                </Typography>
                <Box>
                  {isAuthenticated && (
                    <EditTwoTone
                      sx={{ cursot: 'pointer' }}
                      onClick={() => {
                        navigate(`/edit-analyzed-text/${detail.id}`)
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default AnalyzedTexts
