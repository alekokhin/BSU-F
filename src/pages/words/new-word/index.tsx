import { Button, Container, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { newWord, Word } from 'api/words'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const newAnalyzedTextDefaultValues: Word = {
  id: '',
  word: '',
  correctForm: '',
  intonation: '',
  thematicGroup: '',
  partOfSpeech: '',
  dictionary: '',
}
const NewWords = () => {
  // hooks
  const { handleSubmit, control } = useForm<Word>({
    defaultValues: newAnalyzedTextDefaultValues,
  })
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const $newAnalyzedText = useMutation(newWord)
  return (
    <>
      <Header />
      <Container
        sx={{
          height: '90vh',
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(form => {
            $newAnalyzedText.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
                navigate('/words')
              },
              onError: (error: any) => {
                enqueueSnackbar('something went wrong', { variant: 'error' })
              },
            })
          })}
        >
          <ControlledTextField
            type="text"
            name="word"
            placeholder={t('word')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="correctForm"
            placeholder={t('correctForm')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="intonation"
            placeholder={t('intonation')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="thematicGroup"
            placeholder={t('thematicGroup')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="partOfSpeech"
            placeholder={t('partOfSpeech')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="dictionary"
            placeholder={t('dictionary')}
            control={control}
          />
          <Button type="submit" fullWidth variant="outlined">
            დამატება
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewWords
