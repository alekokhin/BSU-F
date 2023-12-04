import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getAnalyzedTexts } from 'api/analyzed-texts'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const AnalyzedTexts = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['analyzedTexts'], getAnalyzedTexts)

  // eslint-disable-next-line no-console
  console.log(data)
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
