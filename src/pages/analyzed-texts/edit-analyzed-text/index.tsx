import { Container, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  AnalyzedText,
  editAnalyzedText,
  getAnalyzedText,
} from 'api/analyzed-texts'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}

const EditAnalyzedText = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['analyzedText', id],
    queryFn: () => getAnalyzedText(id!),
  })

  const { control, handleSubmit, reset } = useForm<AnalyzedText>({
    defaultValues: data,
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])
  const $editAnalyzedText = useMutation(editAnalyzedText)

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
export default EditAnalyzedText
