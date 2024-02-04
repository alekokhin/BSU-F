import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { newSymbol, SymbolType } from 'api/symbols'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const symbolDefaultValue: SymbolType = {
  id: '',
  title: '',
  description: '',
  images: [],
  connection: '',
  newImages: [],
}
const NewSymbol = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<SymbolType>({
    defaultValues: symbolDefaultValue,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newImages',
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newSymbol = useMutation(newSymbol)

  //functions
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      append(file)
    }
  }
  const matches = useMediaQuery('(min-width:600px)')

  return (
    <>
      <Header />
      <Container>
        <Stack
          component="form"
          onSubmit={handleSubmit(form => {
            $newSymbol.mutate(form, {
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
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
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

          <Button type="submit" fullWidth variant="outlined">
            დამატება
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewSymbol
