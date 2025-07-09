import { Search } from '@mui/icons-material'
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getItem, ItemType } from 'api/items'
import itemBg from 'assets/images/item.jpg'
import Header from 'components/header'
import ImageList from 'components/imageList'
import Loader from 'components/loader'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

const Item = () => {
  const { id } = useParams<Params>()
  const [item, setItem] = useState<ItemType>()
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslation()

  useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id!),
    onSuccess: data => {
      setItem(data)
    },
  })

  const list = item
    ? Object.entries(item)
        .filter(
          ([key, value]) =>
            value !== '' &&
            key !== 'newImages' &&
            key !== 'images' &&
            key !== 'description' &&
            key !== 'title' &&
            key !== 'date' &&
            key !== 'id',
        )
        .map(([key, value]) => ({ key, value }))
    : []

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) {
      return text
    }

    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part,
      )
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${itemBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // background: 'inherit',
          // filter: 'blur(2px)',
          opacity: 0.7,
          zIndex: -1,
          position: 'absolute',
        }}
      />
      {item ? (
        <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
          >
            <Stack sx={{ width: '90%' }} spacing={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'sticky',
                }}
              >
                <Typography variant="h4">{item.title}</Typography>
                <TextField
                  sx={{ height: '30px' }}
                  value={searchTerm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    style: {
                      borderWidth: '2px',
                      borderRadius: '30px',
                      backgroundColor: '#fff',
                    },
                  }}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-evenly',
                }}
              >
                <ImageList images={item?.images || []} page="item" />
                <Box>
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 400,
                      // bgcolor: 'transparent',
                      // backdropFilter: 'blur(5px)',
                      maxHeight: '400px',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {list.map((detail, index) => (
                      <Box key={index}>
                        <Box fontWeight="bold">
                          {t(
                            `item${
                              detail.key.charAt(0).toUpperCase() +
                              detail.key.slice(1)
                            }`,
                          ) + ':'}
                        </Box>
                        <Box fontSize="25px"> {detail.value}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" fontSize="35px">
                  {highlightSearchTerm(item.description)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Item
