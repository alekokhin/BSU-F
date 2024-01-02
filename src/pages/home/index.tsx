import { Box, Container, Stack, Typography } from '@mui/material'
import home from 'assets/images/home.png'
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
      <Stack spacing={7}>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight="900" color="#660303">
            {t('homeTitle')}
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: '500px',
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Typography
            sx={{
              margin: '0px 0px 0px 25px',
              width: { xs: '95%', sm: '80%' },
            }}
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
