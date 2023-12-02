import { Box } from '@mui/material'
import Header from 'components/header'
import { useTranslation } from 'react-i18next'

const Item = () => {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <Box>{t('title')}</Box>
    </>
  )
}
export default Item
