import { Add, EditTwoTone } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getAnalyzedTexts } from 'api/analyzed-texts'
import textBg from 'assets/images/texts.jpg'
import Header from 'components/header'
import Loader from 'components/loader'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const AnalyzedTexts = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['analyzedTexts'], getAnalyzedTexts)

  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-analyzed-text')}
        />
      )}
      <Box
        sx={{
          minHeight: '90vh',
          width: '100%',
          backgroundImage: `url(${textBg})`,
          backgroundSize: 'cover',
          // filter: 'blur(2px)',
        }}
      >
        {data ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box width="90%">
              {data.map((detail, index) => (
                <Box
                  key={index}
                  fontSize="50px"
                  sx={{
                    display: 'flex',
                    justifyContent: isAuthenticated
                      ? 'space-between'
                      : 'center',
                    height: '70px',
                  }}
                >
                  <Box>
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
                  </Box>
                  <Box>
                    <Box sx={{ width: '10%' }}>
                      {isAuthenticated && (
                        <EditTwoTone
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/edit-analyzed-text/${detail.id}`)
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Loader />
        )}
      </Box>
    </>
  )
}
export default AnalyzedTexts
