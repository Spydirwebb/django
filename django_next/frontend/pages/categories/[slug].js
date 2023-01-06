import Layout from "../../components/Layout"

import { Grid, Box, Card, CardContent, Link, Typography } from "@mui/material"
import {styled} from '@mui/system'




const Category = ({category}) => {
    return(
        <CategoryStyled>
            <Layout>
            <Grid container>
                <Grid item xs={12} md={3}>
                    todo filters
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card className="card">
                        <Box>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant='h5'>Business Name</Typography>
                                        <Typography variant='subtitle1' className="subtitle">$$</Typography>
                                        <Link variant='subtitle1' href='https://3000-spydirwebb-django-canuz7re0z4.ws-us81.gitpod.io/'>Business Website</Link>
                                        <Typography variant='subtitle1'>Business Phone</Typography>
                                        <Typography variant='subtitle1' className="subtitle">Business Description</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h5'>Todo Reviews</Typography>
                                        <Typography variant="subtitle1">Business Hours</Typography>
                                        <Typography variant="subtitle1">Business Address</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
           </Layout>
        </CategoryStyled>
    )
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