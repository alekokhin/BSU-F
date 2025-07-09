import { Box, Stack, Typography } from '@mui/material'
import homeTextImage from 'assets/images/homeTextImage.jpg'
import Header from 'components/header'
import { useTranslation } from 'react-i18next'
const Home = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{ backgroundColor: '#dacbb3', height: '100dvh', overflow: 'hidden' }}
    >
      <Header />

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
            width: { xs: '80%', sm: '70%' },
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
    </Box>
  )
}

export default Home
