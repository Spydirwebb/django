import axios from 'axios'

import { Avatar, Card, CardHeader, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; 


import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home( {categories} ) {
  return (
    <Layout>
      <Grid2 container spacing={3}>
        {categories.map(category => (
          <Grid2 item xs={12} md={4} className={styles.containerCard} key={category.id}>
            <Card className={styles.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label='category'>C</Avatar>
                }
                title={`Category ${category.name}`}
                subheader={`See all ${category.name} businesses`}
              />
            </Card>
          </Grid2>
              ))}
      </Grid2>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get('https://8000-spydirwebb-django-canuz7re0z4.ws-us81.gitpod.io/categories')

  return {
    props: {
      categories: data
    }
  }
}