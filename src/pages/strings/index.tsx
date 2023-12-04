import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getStrings } from 'api/strings'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const Strings = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['strings'], getStrings)
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-string')}
        />
      )}
    </>
  )
}
export default Strings
