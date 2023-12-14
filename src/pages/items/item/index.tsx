import { Box, Stack, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getItem, ItemType } from 'api/items'
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
    // return text.replace(regex, (match, p1) => `<mark>${p1}</mark>`)
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part,
      )
  }

  return (
    <>
      <Header />
      {item ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  sx={{ borderRadius: '30px', height: '30px' }}
                  value={searchTerm}
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
                      bgcolor: 'background.paper',
                      maxHeight: '600px',
                      overflow: 'auto',
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
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(String(detail.value)),
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2">
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
