import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteString, editString, getString, String } from 'api/strings'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}
const EditString = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const $delete = useMutation(deleteString)
  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['getString', id],
    queryFn: () => getString(id!),
  })

  const { control, handleSubmit, reset } = useForm<String>({
    defaultValues: data,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])
  const $editString = useMutation(editString)
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        const base64Image = reader.result as string
        append({ image: base64Image })
      })

      reader.readAsDataURL(file)
    }
  }
  const deleteElement = () => {
    $delete.mutate(id!, {
      onSuccess: () => {
        enqueueSnackbar('item delete successfully', {
          variant: 'success',
        })
        navigate('/items')
      },
      onError: (error: any) => {
        // eslint-disable-next-line no-console
        console.log(error)
        enqueueSnackbar('something went wrong', { variant: 'error' })
      },
    })
  }
  const matches = useMediaQuery('(min-width:600px)')

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
            $editString.mutate(form, {
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
          <Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ width: '49%' }}>
                <TextField
                  name="images"
                  type="file"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  inputProps={{ multiple: true }}
                  onChange={handleChange}
                />
                {fields && (
                  <ImageList
                    cols={matches ? 3 : 2}
                    variant="woven"
                    // gap={8}
                    rowHeight={164}
                    sx={{ width: '550px', height: '450px' }}
                  >
                    {fields.map((image, index) => {
                      return (
                        <ImageListItem key={index}>
                          <img src={image?.image} alt={`Item ${index}`} />
                          <Button
                            onClick={() => remove(index)}
                            variant="outlined"
                            fullWidth
                          >
                            Remove
                          </Button>
                        </ImageListItem>
                      )
                    })}
                  </ImageList>
                )}
              </Box>
              <Stack
                spacing={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: '49%',
                }}
              >
                <ControlledTextField
                  type="text"
                  name="title"
                  placeholder={t('itemTitle')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="connection"
                  placeholder={t('connection')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="description"
                  multiline
                  fullWidth
                  sx={{ maxHeight: '200px', overflow: 'auto' }}
                  minRows={5}
                  placeholder={t('itemDescription')}
                  control={control}
                />
              </Stack>
            </Box>
          </Stack>
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
export default EditString
