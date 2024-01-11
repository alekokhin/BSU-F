import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Container, Link, Stack, Typography } from '@mui/material'
import Header from 'components/header'
import { useTranslation } from 'react-i18next'
const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 0px 20px #a3a3a3',
  borderRadius: '5px',
  //   height: '50px',
  padding: '5px',
}
const CorpusList = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        backgroundColor: '#dacbb3',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container
        sx={{ minHeight: '90vh', display: 'grid', placeItems: 'center' }}
      >
        <Stack
          width="70%"
          spacing={3}
          maxHeight="80vh"
          overflow="auto"
          p={3}
          sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="http://www.digipal.eu/"
                color="inherit"
                underline="none"
              >
                {t('digipal')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="https://digital.bodleian.ox.ac.uk/"
                color="inherit"
                underline="none"
              >
                {t('digitalBodleian')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="https://armazi.uni-frankfurt.de/framee.htm"
                color="inherit"
                underline="none"
              >
                {t('armazi')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href=" http://titus.uni-frankfurt.de/texte/etcg/cauc/ageo/inscr/carcera/carce.htm;"
                color="inherit"
                underline="none"
              >
                {t('titus')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="corpora"
                color="inherit"
                underline="none"
              >
                {t('corpora')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="http://gnc.gov.ge/gnc/static/portal/gnc.html"
                color="inherit"
                underline="none"
              >
                {t('gnc')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Box sx={linkStyle}>
            <Box>
              <Link
                target="_blank"
                href="https://repository.mountathos.org/jspui/browsecontent?location=20.500.11957/2&view=matrix"
                color="inherit"
                underline="none"
              >
                {t('repositoryMountathos')}
              </Link>
            </Box>
            <ArrowForwardIos />
          </Box>
          <Stack
            sx={{ border: '2px solid #5e5555', borderRadius: '5px' }}
            spacing={3}
            p={2}
            marginLeft="15px !important"
          >
            <Typography variant="h6">{t('abroad')}</Typography>
            <Box sx={linkStyle}>
              <Box>
                <Link
                  target="_blank"
                  href="http://www.mss.vatlib.it/guii/scan/link.jsp "
                  color="inherit"
                  underline="none"
                >
                  {t('vaticanLibrary')}
                </Link>
              </Box>
              <ArrowForwardIos />
            </Box>
            <Box sx={linkStyle}>
              <Box>
                <Link
                  target="_blank"
                  href="https://www.bnf.fr/en "
                  color="inherit"
                  underline="none"
                >
                  {t('nationalLibraryOfParis')}
                </Link>
              </Box>
              <ArrowForwardIos />
            </Box>
            <Box sx={linkStyle}>
              <Box>
                <Link
                  target="_blank"
                  href="http://www.bl.uk/manuscripts/Default.aspx "
                  color="inherit"
                  underline="none"
                >
                  {t('britishLibrary')}
                </Link>
              </Box>
              <ArrowForwardIos />
            </Box>
            <Box sx={linkStyle}>
              <Box>
                <Link
                  target="_blank"
                  href="https://www.schoyencollection.com/ "
                  color="inherit"
                  underline="none"
                >
                  {t('schoenCollection')}
                </Link>
              </Box>
              <ArrowForwardIos />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default CorpusList
