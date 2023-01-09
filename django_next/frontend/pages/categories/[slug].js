import Layout from "../../components/Layout"

import { Grid, Box, Card, CardContent, Link, Typography } from "@mui/material"
import {styled} from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'

const Category = ({ category }) => {
    const router = useRouter()
    
    const handleBusinessClick = business => {
        router.push(`/business/${business.slug}`)
      }
    return(
        <CategoryStyled>
            <Layout>
            <Grid container>
                <Grid item xs={12} md={3}>
                    todo filters
                </Grid>
                <Grid item xs={12} md={9}>
                    {category.business.map(business => (
                    <Card className="card" onClick={() => handleBusinessClick(business)}>
                        <Box>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant='h5'>{business.name}</Typography>
                                        <Typography variant='subtitle1' className="subtitle">{business.price_range}</Typography>
                                        <Link variant='subtitle1' href={business.website}>{business.website}</Link>
                                        <Typography variant='subtitle1'>{business.phone}</Typography>
                                        <Typography variant='subtitle1' className="subtitle">{business.description}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h5'>Todo Reviews</Typography>
                                        <Typography variant="subtitle1">{business.hours}</Typography>
                                        <Typography variant="subtitle1">{business.street_address} {business.city}, {business.region} {business.postal_code} {business.country}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                    ))}
                </Grid>
            </Grid>
           </Layout>
        </CategoryStyled>
    )
}
export async function getServerSideProps({ query: {slug} }) {
    let { data } = await axios.get(`${process.env.DB_BASE_URL}/categories/?slug=${slug}`)

    //console.log(data)
    return {
      props: {
        category: data[0] || null
      }
    }
  }
const CategoryStyled = styled('Category')({
    root:{
        margin: '25px',
        maxWidth: '95vw'
    },
    ".subtitle": {
        color: 'grey'
    },
    ".card": {
        cursor: 'pointer'
    }
})
export default Category