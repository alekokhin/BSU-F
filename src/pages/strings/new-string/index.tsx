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
import { useMutation } from '@tanstack/react-query'
import { newString, StringType } from 'api/strings'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const newStringDefaultValues: StringType = {
  id: '',
  connection: '',
  description: '',
  images: [],
  title: '',
}
const NewString = () => {
  // hooks
  const { t } = useTranslation()
  const matches = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<StringType>({
    defaultValues: newStringDefaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newString = useMutation(newString)

  //functions
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      append(file)
    }
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
            $newString.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
                navigate('/strings')
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
                          <img src={image} alt={`Item ${index}`} />
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

          <Button type="submit" fullWidth variant="outlined">
            დამატება
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewString
