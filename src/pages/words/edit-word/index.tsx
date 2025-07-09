import { Box, Button, Container, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteWord, editWord, getWord, Word } from 'api/words'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Params, useParams } from 'react-router-dom'

const EditWords = () => {
  const { id } = useParams<Params>()
  const $delete = useMutation(deleteWord)

  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['analyzedText', id],
    queryFn: () => getWord(id!),
  })

  const { control, handleSubmit, reset } = useForm<Word>({
    defaultValues: data,
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])
  const $editAnalyzedText = useMutation(editWord)
  const deleteElement = () => {
    $delete.mutate(id!, {
      onSuccess: () => {
        enqueueSnackbar('item delete successfully', {
          variant: 'success',
        })
        location.reload()
      },
      onError: (error: any) => {
        enqueueSnackbar('something went wrong', { variant: 'error' })
      },
    })
  }
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
            $editAnalyzedText.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
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
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="outlined" sx={{ width: '49%' }}>
              განახლება
            </Button>
            <Button
              onClick={deleteElement}
              variant="outlined"
              color="error"
              sx={{ width: '49%' }}
            >
              წაშლა
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
export default EditWords
