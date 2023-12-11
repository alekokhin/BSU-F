import { Add } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getWords } from 'api/words'
import Header from 'components/header'
import { MyTable } from 'components/table/table'
import { useAuthContext } from 'providers/auth'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Words = () => {
  const { isAuthenticated } = useAuthContext()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useQuery(['words'], getWords)

  const words = data?.map(w => {
    const {
      correctForm,
      dictionary,
      id,
      intonation,
      partOfSpeech,
      thematicGroup,
      word,
    } = w
    return [
      id,
      word,
      correctForm,
      intonation,
      thematicGroup,
      partOfSpeech,
      dictionary,
    ]
  })
  return (
    <>
      <Header />
      {isAuthenticated && (
        <Add sx={{ cursor: 'pointer' }} onClick={() => navigate('/new-word')} />
      )}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '90vh',
          overflow: 'auto',
        }}
      >
        <MyTable
          type="standard"
          isLoading={!data}
          rows={words || []}
          headers={[
            { title: t('word'), key: 'word' },
            { title: t('correctForm'), key: 'correctForm' },
            { title: t('intonation'), key: 'intonation' },
            { title: t('thematicGroup'), key: 'thematicGroup' },
            { title: t('partOfSpeech'), key: 'partOfSpeech' },
            { title: t('dictionary'), key: 'dictionary' },
          ]}
          rowClickRoute={isAuthenticated ? '/edit-word/' : undefined}
        />
      </Container>
    </>
  )
}
export default Words
