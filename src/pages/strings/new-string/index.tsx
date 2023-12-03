import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { newString, String } from 'api/strings'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'

const newStringDefaultValues: String = {
  id: '',
  connection: '',
  description: '',
  images: [],
  title: '',
}
const NewString = () => {
  // hooks
  const { handleSubmit, control } = useForm<String>({
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
            $newString.mutate(form, {
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
            name="connection"
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
export default NewString
