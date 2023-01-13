import axios from 'axios'
import {useRouter} from 'next/router'

import { Avatar, Card, CardHeader, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; 

import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home( {categories} ) {
  const router = useRouter()
  return (
    <Layout>
      <Grid2 container spacing={3}>
        {categories.map(category => (
          <Grid2 item xs={12} md={4} className={styles.containerCard} key={category.ordinal}>
            <Card className={styles.card} onClick={() => router.push(`/categories/${category.slug}`)}>
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
  const { data } = await axios.get(`${process.env.DB_BASE_URL}/categories`)

  return {
    props: {
      categories: data
    }
  }
}