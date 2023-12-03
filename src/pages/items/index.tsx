import { Add } from '@mui/icons-material'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Items = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add sx={{ cursor: 'pointer' }} onClick={() => navigate('/new-item')} />
      )}
    </>
  )
}
export default Items
