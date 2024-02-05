import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteSymbol, editSymbol, getSymbol, SymbolType } from 'api/symbols'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { isLocal } from 'components/form/validations'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { locales } from 'providers/locales'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
type Params = {
  id: string
}
const REACT_APP_API_URL = isLocal
  ? process.env.REACT_APP_LOCAL_API_URL
  : process.env.REACT_APP_API_URL
const EditSymbol = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['item', id],
    queryFn: () => getSymbol(id!),
  })
  const { control, reset, handleSubmit } = useForm<SymbolType>({
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

  const { enqueueSnackbar } = useSnackbar()
  const $editSymbol = useMutation(editSymbol)
  const $delete = useMutation(deleteSymbol)
  const { t } = useTranslation()

  //functions
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
      <Container>
        <Stack
          component="form"
          onSubmit={handleSubmit(form => {
            $editSymbol.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
                location.reload()
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
                          delete image.id
                          return (
                            <ImageListItem key={index}>
                              <img
                                src={`${REACT_APP_API_URL}${locales}/symbol/images/${Object.values(
                                  image,
                                ).join('')}`}
                                alt={`Item ${index}`}
                              />
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
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
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
export default EditSymbol
