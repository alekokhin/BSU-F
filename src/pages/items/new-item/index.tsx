import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { ItemType, newItem } from 'api/items'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'

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
  const { handleSubmit, control } = useForm<ItemType>({
    defaultValues: newItemDefaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newItem = useMutation(newItem)

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
              },
              onError: (error: any) => {
                enqueueSnackbar('something went wrong', { variant: 'error' })
              },
            })
          })}
        >
          <ControlledTextField
            type="text"
            name="title"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="description"
            multiline
            rows={5}
            placeholder="Enter Title"
            control={control}
          />
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
            <ImageList cols={3} rowHeight={164}>
              {fields.map((image, index) => {
                return (
                  <ImageListItem key={index}>
                    <img src={image.image} alt={`Item ${index}`} />
                    <Button onClick={() => remove(index)} variant="outlined">
                      Remove
                    </Button>
                  </ImageListItem>
                )
              })}
            </ImageList>
          )}
          <ControlledTextField
            type="text"
            name="security"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="damaged"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="color"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="structure"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="reWriteDate"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="reWritePlace"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="number"
            name="paperCount"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="size"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="number"
            name="countOfColumns"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="number"
            name="countOfRow"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="typeOfPagination"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="transcriber"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="belonging"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="firstAndLast"
            placeholder="Enter Title"
            control={control}
          />
          <ControlledTextField
            type="text"
            name="will"
            placeholder="Enter Title"
            control={control}
          />

          <Button type="submit" fullWidth variant="outlined">
            add item
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewItem
