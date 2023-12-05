import { ArrowBackIos } from '@mui/icons-material'
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
    '/symbols',
    '/analyzed-texts',
    '/strings',
    '/words',
  ]

  const activeIndex = paths.indexOf(location.pathname)

  return activeIndex !== -1 ? activeIndex : false
}

const Header = () => {
  // Hooks
  const { t } = useTranslation()
  const { unauthorize, isAuthenticated } = useAuthContext()
  const { selectedLanguage, toggleLocales } = useContext(LocalesContext)
  const navigate = useNavigate()

  // Check if the current page is the home page
  const activeIndex = useActiveIndex()
  const page = activeIndex === false
  const isHomePage = location.pathname === '/home'

  return (
    <AppBar
      sx={{
        bgcolor: '#03a9f3',
        position: 'sticky',
        marginBottom: isHomePage ? '0' : '25px',
      }}
    >
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
                navigate('/home')
              }}
            >
              Logout
            </Button>
          )}
          {page && (
            <ArrowBackIos
              sx={{ cursor: 'pointer', marginRight: '5px' }}
              onClick={() => {
                navigate(-1)
              }}
            />
          )}
        </Box>
        {!page && (
          <Box sx={{ width: '50%' }}>
            <BottomNavigation
              sx={{
                fontSize: '15px',

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
                label={t('Symbols')}
                onClick={() => navigate('/symbols')}
              />

              <BottomNavigationAction
                label={t('Text analysis')}
                onClick={() => navigate('/analyzed-texts')}
              />

              <BottomNavigationAction
                label={t('Strings')}
                onClick={() => navigate('/strings')}
              />
              <BottomNavigationAction
                label={t('word')}
                onClick={() => navigate('/words')}
              />
            </BottomNavigation>
          </Box>
        )}

        {/* Right side of the header */}
        <Box>
          {!page && (
            <Box
              onClick={toggleLocales}
              component="img"
              src={selectedLanguage === 'GE' ? EN : GE}
              sx={{ cursor: 'pointer', width: '25px' }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
