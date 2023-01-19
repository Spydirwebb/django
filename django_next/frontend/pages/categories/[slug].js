import Layout from "../../components/Layout"
import AverageReview from '../../components/AverageReview'

import { Grid, Box, Card, CardContent, Link, Typography } from "@mui/material"
import {styled} from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'

const Category = ({ category, reviewAvgs }) => {
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
                    <Card className="card" onClick={() => handleBusinessClick(business)} key={business.id}>
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
                                        <Typography variant='h5'><AverageReview value={reviewAvgs[business.url]}/></Typography>
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
    //console.log(data[0])
    let reviewAvgs = {}
    let i=0
    while(data[0].business[i]){
        let business = data[0].business[i]
        let average = getReviewAverage(business)
        console.log('stars: ' + average)
        reviewAvgs[business.url] = average
        i+=1
    }
    return {
      props: {
        category: data[0] || null,
        reviewAvgs: reviewAvgs
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

const getReviewAverage = (business) => {
    let reviewAvg = null
    //get count of reviews (length doesn't work for some reason. business.reviews is an object)
    let reviewCount=0
    let totalReviewsStars = 0
    let i=0
    while (business.reviews[i]){
        reviewCount+=1
        totalReviewsStars = totalReviewsStars + Number(business.reviews[i].stars)
        
        i+=1
    }
    const inverse = 1/2

    reviewAvg = Math.round((totalReviewsStars / reviewCount) / inverse) * inverse

    return reviewAvg
}