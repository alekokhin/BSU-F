/* eslint-disable no-console */
import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { editItem, getItem, Item } from 'api/items'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import Header from 'components/header'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}

const EditItem = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id!),
  })

  const { control, handleSubmit, reset } = useForm<Item>({
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
  const $editItem = useMutation(editItem)
  const handleChange = (e: any) => {
    const files = e.target.files

    // Process each file individually
    for (const file of files) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        const base64Image = reader.result as string
        console.log(base64Image)
        append({ images: base64Image })
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
            console.log(form)
            $editItem.mutate(form, {
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
export default EditItem
