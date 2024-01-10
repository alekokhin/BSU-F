import { Box, Container, Stack, Typography } from '@mui/material'
import home from 'assets/images/home.jpg'
import homeTextImage from 'assets/images/homeTextImage.jpg'
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
          minHeight: '90vh',
          // backgroundImage: `url(${home})`,
          backgroundColor: '#dacbb3',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // background: 'inherit',
          // filter: 'blur(2px)',
          zIndex: -1,
          position: 'absolute',
        }}
      />
      <Stack spacing={7}>
        <Box textAlign="center">
          <Typography
            variant="h5"
            fontWeight="900"
            color="#000"
            fontFamily="bpg"
            marginTop="15px"
          >
            {t('homeTitle')}
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: '500px',
            overflow: 'auto',
            width: { xs: '60%', sm: '50%' },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <img
            src={homeTextImage}
            alt=""
            width="400px"
            style={{ float: 'right', margin: '5px' }}
          />
          <Typography
            sx={{
              margin: '0px 0px 0px 25px',
              // backdropFilter: 'blur(5px)',
              fontSize: '18px',
              textAlign: 'justify',
            }}
            variant="h6"
            fontWeight="900"
            color="#000"
          >
            {t('mainHomeText')}
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default Home
