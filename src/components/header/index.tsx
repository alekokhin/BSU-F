import { Add, ArrowBackIos } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import EN from 'assets/images/en.png'
import GE from 'assets/images/ge.png'
import BSU from 'assets/images/logo.png'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../providers/auth'

const Header = () => {
  // Hooks
  const { t, i18n } = useTranslation()
  const { unauthorize, isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [locales, setLocales] = useState('GE')

  // Functions
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng)
  }

  // Check if the current page is the home page
  const isHomePage = location.pathname === '/home'

  return (
    <AppBar sx={{ bgcolor: '#03a9f3', position: 'sticky' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side of the header */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            onClick={() => navigate('/home')}
            src={BSU}
            sx={{ cursor: 'pointer' }}
          />
          {isAuthenticated && (
            <Button
              onClick={() => {
                unauthorize()
                navigate('/sign-in')
              }}
            >
              Logout
            </Button>
          )}
          {!isHomePage && (
            <ArrowBackIos
              sx={{ cursor: 'pointer', marginRight: '5px' }}
              onClick={() => {
                navigate(-1)
              }}
            />
          )}
        </Box>

        {/* Right side of the header */}
        <Box>
          {isAuthenticated && (
            <Add
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/new-item')}
            />
          )}
          <Box
            onClick={() => {
              changeLanguage(locales === 'GE' ? 'EN' : 'GE')
              setLocales(locales === 'GE' ? 'EN' : 'GE')
            }}
            component="img"
            src={locales === 'GE' ? EN : GE}
            sx={{ cursor: 'pointer', width: '25px' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
