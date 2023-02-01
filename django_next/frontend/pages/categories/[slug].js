import Layout from "../../components/Layout"
import AverageReview from '../../components/AverageReview'

import { Grid, Box, Card, CardContent, Link, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import {styled} from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from "react"

const Category = ({ category, reviewAvgs }) => {
    const [price, setPrice] = useState("")
    const [numReviews, setNumReviews] = useState("")
    const [rating, setRating] = useState("")

    const router = useRouter()
    
    const handleBusinessClick = business => {
        router.push(`/business/${business.slug}`)
      }
    
    const handleClearFilters =() => {
        setPrice(null)
        setNumReviews(null)
        setRating(null)
    }
    return(
        <CategoryStyled>
            <Layout>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box className="filterContainer">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Filter the Results</Typography>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='price'>Price</InputLabel>
                                    <Select
                                        labelId='price'
                                        id='priceInput'
                                        label='Price' 
                                        onChange={e=>setPrice(e.target.value)}
                                        value={price}
                                    >
                                        <MenuItem value={'$'}>Very Cheap</MenuItem>
                                        <MenuItem value={'$$'}>Cheap</MenuItem>
                                        <MenuItem value={'$$$'}>Moderate</MenuItem>
                                        <MenuItem value={'$$$$'}>Expensive</MenuItem>
                                        <MenuItem value={'$$$$$'}>Very Expensive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='numReviews'>Number of Reviews</InputLabel>
                                    <Select
                                        labelId='numReviews'
                                        id='numReviewsInput'
                                        label='Number of Reviews' 
                                        onChange={e=>setNumReviews(e.target.value)}
                                        value={numReviews}
                                    >
                                        <MenuItem value={5}>5+</MenuItem>
                                        <MenuItem value={10}>10+</MenuItem>
                                        <MenuItem value={15}>15+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='rating'>Average Rating</InputLabel>
                                    <Select
                                        labelId='rating'
                                        id='ratingInput'
                                        label='Average Rating' 
                                        onChange={e=>setRating(e.target.value)}
                                        value={rating}
                                    >
                                        <MenuItem value={3}>3+ Stars</MenuItem>
                                        <MenuItem value={4}>4+ Stars</MenuItem>
                                        <MenuItem value={5}>5 Stars</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='outlined' color='secondary' className="filterContent-button" onClick={()=>handleClearFilters()}>Clear Filters</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {category.business.map(business => (
                    (!price || price <= business.price_range) && (!numReviews || numReviews <= business.reviews.length) && (!rating || reviewAvgs[business.url] >= rating) && (
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
                    )
                    ))}
                </Grid>
            </Grid>
           </Layout>
        </CategoryStyled>
    )
}
export async function getServerSideProps({ query: {slug} }) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/categories/?slug=${slug}`)
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
    },
    ".filterContainer":{
        margin: '0 25px'
    },
    ".filterContent-button":{
        marginTop: '15px'
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