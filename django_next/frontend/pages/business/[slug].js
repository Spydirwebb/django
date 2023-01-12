import styled from "@emotion/styled"
import { Button, Card, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import Layout from "../../components/Layout"

import axios from 'axios'
import AverageReview from "../../components/AverageReview"

const BusinessPage = ( {business} ) => {
    return (
        <BusinessPageStyled>
        <Layout>
            <Grid container className="root">
                <Grid item xs={12} md={6}>
                    <Typography variant='h2'>{business.name}</Typography>
                    <Typography variant='h4'>{business.price_range}</Typography>
                    <Typography variant='subtitle1'><AverageReview value={1.5} /></Typography>
                    <div className="addReview">
                        <Button variant='contained' color='primary'>Write a review</Button>
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
        </Layout>
        </BusinessPageStyled>
    )
}

export async function getServerSideProps({ query: {slug} }) {
    let { data } = await axios.get(`${process.env.DB_BASE_URL}/businesses/?slug=${slug}`)

    //console.log(data)
    return {
      props: {
        business: data[0] || null
      }
    }
  }

const BusinessPageStyled = styled('BusinessPage')({
    ".root":{
        maxWidth: '95wv'
    },
    ".addReview": {
        marginTop: '15px'
    },
    ".description": {
        paddingTop: '15px',
    }
})

export default BusinessPage