import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteItem, editItem, getItem, ItemType } from 'api/items'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { locales } from 'providers/locales'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const EditItem = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data } = useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id!),
  })

  const { control, reset, handleSubmit } = useForm<ItemType>({
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
  const $editItem = useMutation(editItem)
  const $delete = useMutation(deleteItem)

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
        location.reload()
        setTimeout(() => {
          navigate('/items')
        }, 1000)
      },
      onError: (error: any) => {
        enqueueSnackbar('something went wrong', { variant: 'error' })
      },
    })
  }

  return (
    <>
      <Header />
      <Container
        sx={{
          padding: '10px',
          height: '90vh',
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(form => {
            $editItem.mutate(form, {
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
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '49%' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '49%' }}>
                {fields && (
                  <ImageList
                    cols={2}
                    variant="woven"
                    gap={12}
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
                            src={`${REACT_APP_API_URL}${locales}/item/images/${Object.values(
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
                    cols={2}
                    variant="woven"
                    gap={8}
                    rowHeight={164}
                    sx={{
                      position: 'relative',
                      width: { sm: '400px', md: '500px', lg: '550px' },
                      height: '500px',
                    }}
                  >
                    {newImages.map((image, index) => {
                      // eslint-disable-next-line no-console
                      console.log(image)
                      delete image.id
                      const file = Object.values(image).join('')
                      // eslint-disable-next-line no-console
                      console.log(file)
                      return (
                        <ImageListItem key={index}>
                          <img
                            src={URL.createObjectURL(new Blob([file]))}
                            alt={`Item ${index}`}
                          />
                          <Button
                            onClick={() => RemoveNewImages(index)}
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
            </Box>
          </Stack>

          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" type="submit" sx={{ width: '49%' }}>
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
export default EditItem
