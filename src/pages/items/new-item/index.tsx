import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ItemType, newItem } from 'api/items'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const newItemDefaultValues: ItemType = {
  id: '',
  title: '',
  description: '',
  images: [],
  security: '',
  damaged: '',
  color: '',
  structure: '',
  reWriteDate: '',
  reWritePlace: '',
  paperCount: '',
  size: '',
  countOfColumns: '',
  countOfRow: '',
  typeOfPagination: '',
  transcriber: '',
  belonging: '',
  firstAndLast: '',
  will: '',
}

const NewItem = () => {
  // hooks
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<ItemType>({
    defaultValues: newItemDefaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newItem = useMutation(newItem)
  const { t } = useTranslation()

  //functions
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
            $newItem.mutate(form, {
              onSuccess: () => {
                enqueueSnackbar('item add successfully', {
                  variant: 'success',
                })
                navigate('/items')
              },
              onError: (error: any) => {
                enqueueSnackbar('something went wrong', { variant: 'error' })
              },
            })
          })}
        >
          <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    sx={{ width: '550px', height: '500px' }}
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
              <Grid
                container
                gridTemplateColumns="repeat(2,1fr)"
                columnSpacing={1}
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
                  name="security"
                  placeholder={t('itemSecurity')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="damaged"
                  placeholder={t('itemDamaged')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="color"
                  placeholder={t('itemColor')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="structure"
                  placeholder={t('itemStructure')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="reWriteDate"
                  placeholder={t('itemReWriteDate')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="reWritePlace"
                  placeholder={t('itemReWritePlace')}
                  control={control}
                />
                <ControlledTextField
                  type="number"
                  name="paperCount"
                  placeholder={t('itemPaperCount')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="size"
                  placeholder={t('itemSize')}
                  control={control}
                />
                <ControlledTextField
                  type="number"
                  name="countOfColumns"
                  placeholder={t('itemCountOfColumns')}
                  control={control}
                />
                <ControlledTextField
                  type="number"
                  name="countOfRow"
                  placeholder={t('itemCountOfRow')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="typeOfPagination"
                  placeholder={t('itemTypeOfPagination')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="transcriber"
                  placeholder={t('itemTranscriber')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="belonging"
                  placeholder={t('itemBelonging')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="firstAndLast"
                  placeholder={t('itemFirstAndLast')}
                  control={control}
                />
                <ControlledTextField
                  type="text"
                  name="will"
                  placeholder={t('itemWill')}
                  control={control}
                />
              </Grid>
            </Box>
            <Box>
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
            </Box>
          </Stack>

          <Button
            sx={{ height: '45px' }}
            type="submit"
            fullWidth
            variant="outlined"
            color="success"
          >
            {$newItem.isLoading ? (
              <CircularProgress color="success" sx={{ width: '15px' }} />
            ) : (
              'დამატება'
            )}
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewItem
