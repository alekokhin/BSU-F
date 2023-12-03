import { Container, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AnalyzedText, newAnalyzedText } from 'api/analyzed-texts'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

const newAnalyzedTextDefaultValues: AnalyzedText = {
  id: '',
  connection: '',
  description: '',
}
const NewAnalyzedText = () => {
  // hooks
  const { handleSubmit, control } = useForm<AnalyzedText>({
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
            name="description"
            placeholder="Enter Title"
            multiline
            rows={5}
            control={control}
          />
          <ControlledTextField
            type="text"
            name="connection"
            placeholder="Enter Title"
            control={control}
          />
        </Stack>
      </Container>
    </>
  )
}
export default NewAnalyzedText
