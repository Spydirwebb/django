import { Avatar, Card, CardHeader, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; 
import Layout from '../components/Layout'

const Grid2Styled = styled(Grid2)`
  root:(
    margin: 25px auto,
    maxWidth: 95vw,
  )
`

export default function Home() {
  return (
    <Layout>
      <Grid2 container spacing={3}>
          <Grid2Styled item xs={12} md={4}>
            <Card className='card'>
              <CardHeader
                avatar={
                  <Avatar aria-label='category'>C</Avatar>
                }
                title='Category'
                subheaders='See all'
              />
            </Card>
          </Grid2Styled>
          <Grid2Styled item xs={12} md={4}>
            <Card className='card'>
              <CardHeader
                avatar={
                  <Avatar aria-label='category'>C</Avatar>
                }
                title='Category'
                subheaders='See all'
              />
            </Card>
          </Grid2Styled>
          <Grid2Styled item xs={12} md={4}>
            <Card className='card'>
              <CardHeader
                avatar={
                  <Avatar aria-label='category'>C</Avatar>
                }
                title='Category'
                subheaders='See all'
              />
            </Card>
          </Grid2Styled>
      </Grid2>
    </Layout>
  )
}