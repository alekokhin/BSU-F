import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getWords } from 'api/words'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'

const Words = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['words'], getWords)
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add sx={{ cursor: 'pointer' }} onClick={() => navigate('/new-word')} />
      )}
    </>
  )
}
export default Words
