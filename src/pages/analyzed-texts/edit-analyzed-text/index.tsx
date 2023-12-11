import { Box, Button, Container, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  AnalyzedTextType,
  deleteAnalyzedText,
  editAnalyzedText,
  getAnalyzedText,
} from 'api/analyzed-texts'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}

const EditAnalyzedText = () => {
  const { id } = useParams<Params>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['analyzedText', id],
    queryFn: () => getAnalyzedText(id!),
  })

  const { control, handleSubmit, reset } = useForm<AnalyzedTextType>({
    defaultValues: data,
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])
  const $editAnalyzedText = useMutation(editAnalyzedText)
  const $delete = useMutation(deleteAnalyzedText)

  const deleteElement = () => {
    $delete.mutate(id!, {
      onSuccess: () => {
        enqueueSnackbar('item delete successfully', {
          variant: 'success',
        })
        navigate('/items')
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
            name="title"
            placeholder={t('itemTitle')}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="description"
            placeholder={t('itemDescription')}
            multiline
            rows={5}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="connection"
            placeholder={t('connection')}
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
export default EditAnalyzedText
