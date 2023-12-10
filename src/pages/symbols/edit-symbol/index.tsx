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
import { deleteSymbol, editSymbol, getSymbol, SymbolType } from 'api/symbols'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
type Params = {
  id: string
}
const EditSymbol = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['item', id],
    queryFn: () => getSymbol(id!),
  })
  const { handleSubmit, control, reset } = useForm<SymbolType>({
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

  const { enqueueSnackbar } = useSnackbar()
  const $editSymbol = useMutation(editSymbol)
  const $delete = useMutation(deleteSymbol)
  const { t } = useTranslation()

  //functions
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        const base64Image = reader.result as string
        append({ images: base64Image })
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
      <Container>
        <Stack
          component="form"
          onSubmit={handleSubmit(form => {
            $editSymbol.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
                navigate('/symbols')
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
export default EditSymbol
