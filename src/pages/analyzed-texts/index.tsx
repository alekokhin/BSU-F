import { Add } from '@mui/icons-material'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const AnalyzedTexts = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-analyzed-text')}
        />
      )}
    </>
  )
}
export default AnalyzedTexts
