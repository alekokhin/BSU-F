import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { editSymbol, getSymbol, Symbol } from 'api/symbols'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
  const { handleSubmit, control, reset } = useForm<Symbol>({
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
export default EditSymbol
