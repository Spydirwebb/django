import styled from "@emotion/styled"
import { Box, Button, Card, CardContent, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material"
import Layout from "../../../components/Layout"

import axios from 'axios'
import AverageReview from "../../../components/AverageReview"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { red } from "@mui/material/colors"

const BusinessPage = ( {business} ) => {
    const [rating, setRating] = useState("")
    const ratingsCount = [0, 0, 0, 0, 0]
    const router = useRouter()
    
    const handleWriteClick = (business) => {
        router.push(`/business/${business.slug}/reviews/add-review`)
    }

    const calcReviewsLength = () =>{
        //let localRatingsCount = [0, 0, 0, 0, 0]
        let i=0
        while(business.reviews[i]){
            let stars = Math.floor(business.reviews[i].stars)
            console.log(stars)
            for(let j=0; j<stars; j++){
                ratingsCount[j]+=1
            }
            i++ 
        };
        console.log(ratingsCount)
        //\\setRatingCount(localRatingsCount)
    }

    //useEffect(()=> {
     //   calcReviewsLength()
      //  console.log(ratingsCount)
    //}, [])
    
    return (
        <BusinessPageStyled>
        {calcReviewsLength ()}
        <Layout>
            <Grid container className="root">
                <Grid item xs={12} md={6}>
                    <Typography variant='h2'>{business.name}</Typography>
                    <Typography variant='h4'>{business.price_range}</Typography>
                    <Typography variant='subtitle1'><AverageReview value={2.5} /></Typography>
                    <div className="addReview">
                        <Button variant='contained' color='primary' onClick={()=>handleWriteClick(business)}>Write a review</Button>
                    </div>
                    <div className="description">
                        <Typography variant="p">{business.description}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <List>
                            <ListItem>
                                <ListItemText primary='Website' secondary={business.website} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='Address' secondary={`${business.street_address} ${business.city}, ${business.region} ${business.postal_code} ${business.country}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='Phone' secondary={business.phone} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='Hours' secondary={business.hours} />
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            <Grid container className="root">
                <Grid item xs={12} md={3}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h5'>Filter the Reviews</Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='reviews'>Review</InputLabel>
                                    <Select
                                        labelId="reviews"
                                        id='reviewsComponent'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <MenuItem value={1}>1+ Stars ({ratingsCount[0]})</MenuItem>
                                        <MenuItem value={2}>2+ Stars ({ratingsCount[1]})</MenuItem>
                                        <MenuItem value={3}>3+ Stars ({ratingsCount[2]})</MenuItem>
                                        <MenuItem value={4}>4+ Stars ({ratingsCount[3]})</MenuItem>
                                        <MenuItem value={5}>5 Stars ({ratingsCount[4]})</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='outlined' color='secondary' className="clearFilters" onClick={()=> setRating("")}>Clear Filters</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} className='reviewList'>
                    {business && business.reviews && business.reviews.map(review => (
                        review.stars>=rating && (
                        <Card className='reviewCard' key={review.id}>
                            <Box>
                                <CardContent>
                                    <AverageReview value={review.stars} />
                                    <Typography variant='h5'>{review.title}</Typography>
                                    <Typography variant='subtitle1'>{review.content}</Typography>
                                </CardContent>
                            </Box>
                        </Card>
                        )
                    ))}
                </Grid>
            </Grid>
        </Layout>
        </BusinessPageStyled>
    )
}

export async function getServerSideProps({ query: {slug} }) {
    let { data } = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/businesses/?slug=${slug}`)

    console.log(data)
    return {
      props: {
        business: data[0] || null
      }
    }
  }

const BusinessPageStyled = styled('BusinessPage')({
    ".root":{
        maxWidth: '95wv',
        padding: '0 25px'
    },
    ".addReview": {
        marginTop: '15px'
    },
    ".description": {
        paddingTop: '15px',
    },
    ".clearFilters":{
        marginTop: '15px'
    },
    '.reviewList': {
        margin: '0 auto'
    },
    '.reviewCard': {
        marginTop: '25px',
        backgroundColor: '#f5f1e4'

    }
})

export default BusinessPage