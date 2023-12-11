import { Button, Container, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AnalyzedTextType, newAnalyzedText } from 'api/analyzed-texts'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const newAnalyzedTextDefaultValues: AnalyzedTextType = {
  id: '',
  title: '',
  connection: '',
  description: '',
}
const NewAnalyzedText = () => {
  // hooks
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<AnalyzedTextType>({
    defaultValues: newAnalyzedTextDefaultValues,
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newAnalyzedText = useMutation(newAnalyzedText)
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
          <Button type="submit" fullWidth variant="outlined">
            add item
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewAnalyzedText
