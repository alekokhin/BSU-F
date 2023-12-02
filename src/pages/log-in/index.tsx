import { Button, Container, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { auth, AuthInput } from 'api/auth/api'
import { ControlledTextField } from 'components/form/controlled/controlled-text-field'
import { useSnackbar } from 'notistack'
import { useAuthContext } from 'providers/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const signInFormDefaultValues: AuthInput = {
  username: '',
  password: '',
}
const LogIn = () => {
  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const { authorize } = useAuthContext()

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<AuthInput>({
    defaultValues: signInFormDefaultValues,
  })

  const $auth = useMutation(auth)

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Stack
          width="90%"
          spacing={2}
          component="form"
          onSubmit={handleSubmit(form => {
            $auth.mutate(form, {
              onSuccess: user => {
                authorize(user)
                navigate('/items')
              },
              onError: (error: any) => {
                enqueueSnackbar('Invalid credentials', { variant: 'error' })
              },
            })
          })}
        >
          <ControlledTextField
            name="username"
            control={control}
            placeholder="Enter username"
            fullWidth
            required
          />
          <ControlledTextField
            name="password"
            type="password"
            control={control}
            placeholder="Enter Password"
            fullWidth
            required
          />
          <Button
            disabled={!isDirty}
            type="submit"
            fullWidth
            variant="outlined"
          >
            LOG IN
          </Button>
        </Stack>
      </Container>
    </>
  )
}
export default LogIn
