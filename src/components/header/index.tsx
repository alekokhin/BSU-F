import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Toolbar,
} from '@mui/material'
import EN from 'assets/images/en.png'
import GE from 'assets/images/ge.png'
import BSU from 'assets/images/logo.png'
import { LocalesContext } from 'providers/locales'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../providers/auth'

const useActiveIndex = () => {
  const location = useLocation()

  const paths = [
    '/home',
    '/items',
    '/words',
    '/analyzed-texts',
    '/symbols',
    '/strings',
  ]

  const activeIndex = paths.indexOf(location.pathname)

  return activeIndex !== -1 ? activeIndex : 0
}

const Header = () => {
  // Hooks
  const { t, i18n } = useTranslation()
  const { unauthorize, isAuthenticated } = useAuthContext()
  const { selectedLanguage, toggleLocales } = useContext(LocalesContext)
  const navigate = useNavigate()

  // Functions
  // const changeLanguage = (lng: any) => {
  //   i18n.changeLanguage(lng)
  // }
  // const selectedLanguage = i18n.language
  // setLocales(selectedLanguage)
  // Check if the current page is the home page
  const activeIndex = useActiveIndex()

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
                navigate('/log-in')
              }}
            >
              Logout
            </Button>
          )}
          {/* {!isHomePage && (
            <ArrowBackIos
              sx={{ cursor: 'pointer', marginRight: '5px' }}
              onClick={() => {
                navigate(-1)
              }}
            />
          )} */}
        </Box>
        <Box sx={{ width: '50%' }}>
          <BottomNavigation
            sx={{
              backgroundColor: 'transparent',
              '& .Mui-selected': { color: '#f0f0f0' },
            }}
            showLabels
            value={activeIndex}
          >
            <BottomNavigationAction
              label={t('Home')}
              onClick={() => navigate('/home')}
            />
            <BottomNavigationAction
              label={t('Handwriting')}
              onClick={() => navigate('/items')}
            />
            <BottomNavigationAction
              label={t('word')}
              onClick={() => navigate('/words')}
            />
            <BottomNavigationAction
              label={t('Text analysis')}
              onClick={() => navigate('/analyzed-texts')}
            />
            <BottomNavigationAction
              label={t('Symbols')}
              onClick={() => navigate('/symbols')}
            />
            <BottomNavigationAction
              label={t('Strings')}
              onClick={() => navigate('/strings')}
            />
          </BottomNavigation>
        </Box>

        {/* Right side of the header */}
        <Box>
          <Box
            onClick={toggleLocales}
            component="img"
            src={selectedLanguage === 'GE' ? EN : GE}
            sx={{ cursor: 'pointer', width: '25px' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
