import styled from "@emotion/styled"
import Layout from "../../../../components/Layout"

import axios from 'axios'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

const AddReviewPage = (  ) => {
    return (
        <AddReviewPageStyled>
        <Layout>
            <div className="title">
                {/* TODO */}
                <Typography variant='h3'>Creating a Review For: Business Name</Typography>
            </div>
            <div>
                <FormControl fullWidth>
                    <InputLabel id='stars'>Stars Rating Out of 5</InputLabel>
                    <Select
                        labelId="stars"
                        id='starsComponent'
                        label='Stars'
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={1.5}>1.5</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={2.5}>2.5</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={3.5}>3.5</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={4.5}>4.5</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        labelId='title'
                        label='Title'
                        id='titleComponent'
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    labelId='title'
                    label='Tell us about your experience here'
                    id='commentComponent'
                    multiline
                    minRows={4}
                    />
                </FormControl>
                <Button variant='contained' color='primary'>Submit Review</Button>
            </div>
        </Layout>
        </AddReviewPageStyled>
    )
}



const AddReviewPageStyled = styled('AddReviewPage')({
    ".root":{
        marginTop: '75px',
        maxWidth: '95vw'
    },
    ".form": {
        marginTop: '35px',
        
    },
    ".description": {
        paddingTop: '15px',
    },
    '@media only screen and (max-width: 768px)':{
        '.title': {
            color: 'red'
        }
    }
})

export default AddReviewPage