import { Box, Container, Stack, Typography } from '@mui/material'
import home from 'assets/images/home.jpg'
import Header from 'components/header'
import { useTranslation } from 'react-i18next'
const Home = () => {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '90vh',
          backgroundImage: `url(${home})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // background: 'inherit',
          filter: 'blur(3px)',
          zIndex: -1,
          position: 'absolute',
        }}
      />
      <Stack spacing={15} sx={{ height: '100vh' }}>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight="900" color="#660303">
            {t('title')}
          </Typography>
        </Box>
        <Box>
          <Typography
            width="55%"
            sx={{ margin: '0px 0px 20px 25px' }}
            variant="h6"
            fontWeight="900"
            color="#660303"
          >
            {t('mainHomeText')}
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default Home
