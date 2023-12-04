import { Add } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getSymbols } from 'api/symbols'
import Header from 'components/header'
import { useAuthContext } from 'providers/auth'
import { useNavigate } from 'react-router-dom'
const Symbols = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const { data } = useQuery(['symbols'], getSymbols)
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/new-symbol')}
        />
      )}
    </>
  )
}
export default Symbols
