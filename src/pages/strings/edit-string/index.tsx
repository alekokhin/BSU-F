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
import { deleteString, editString, getString, StringType } from 'api/strings'
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
  const $editString = useMutation(editString)
  const $delete = useMutation(deleteString)
  const { t } = useTranslation()

  const { data } = useQuery({
    queryKey: ['getString', id],
    queryFn: () => getString(id!),
  })

  const { control, reset, handleSubmit } = useForm<StringType>({
    defaultValues: data,
  })
  const { fields, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const {
    fields: newImages,
    append: AppendNewImages,
    remove: RemoveNewImages,
  } = useFieldArray({
    control,
    name: 'newImages',
  })
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])
  // const $editString = useMutation(editString)
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      AppendNewImages(file)
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
              <Stack
                spacing={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  // width: '49%',
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '49%' }}>
                    {fields && (
                      <ImageList
                        cols={matches ? 3 : 2}
                        variant="woven"
                        // gap={8}
                        rowHeight={164}
                        sx={{
                          position: 'relative',
                          width: { sm: '400px', md: '500px', lg: '550px' },
                          height: '500px',
                        }}
                      >
                        {fields.map((image, index) => {
                          return (
                            <ImageListItem key={index}>
                              <img src={image.image} alt={`Item ${index}`} />
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
                  <Box sx={{ width: '48%' }}>
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
                    {newImages && (
                      <ImageList
                        cols={matches ? 3 : 2}
                        variant="woven"
                        // gap={8}
                        rowHeight={164}
                        sx={{
                          position: 'relative',
                          width: { sm: '400px', md: '500px', lg: '550px' },
                          height: '500px',
                        }}
                      >
                        {newImages.map((image, index) => {
                          return (
                            <ImageListItem key={index}>
                              <img src={image.image} alt={`Item ${index}`} />
                              <Button
                                onClick={() => RemoveNewImages(index)}
                                variant="outlined"
                                fullWidth
                              >
                                RemoveNewImages
                              </Button>
                            </ImageListItem>
                          )
                        })}
                      </ImageList>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" sx={{ width: '49%' }}>
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
