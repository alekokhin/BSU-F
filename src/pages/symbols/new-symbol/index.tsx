import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { newSymbol, Symbol } from 'api/symbols'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useFieldArray, useForm } from 'react-hook-form'

const symbolDefaultValue: Symbol = {
  id: '',
  title: '',
  description: '',
  images: [],
}
const NewSymbol = () => {
  const { handleSubmit, control } = useForm<Symbol>({
    defaultValues: symbolDefaultValue,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })
  const { enqueueSnackbar } = useSnackbar()
  const $newSymbol = useMutation(newSymbol)

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
              // accept: 'image/*'
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
                    <img src={image.images} alt={`Item ${index}`} />
                    <Button onClick={() => remove(index)} variant="outlined">
                      Remove
                    </Button>
                  </ImageListItem>
                )
              })}
            </ImageList>
          )}

          <Button type="submit" fullWidth variant="outlined">
            add item
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default NewSymbol
