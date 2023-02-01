import styled from "@emotion/styled"
import Layout from "../../../../components/Layout"

import axios from 'axios'
import { autocompleteClasses, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"

const AddReviewPage = (  ) => {
    const [stars, setStars] = useState("")
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    

    const submitHandler = () => {
        console.log(stars)
        console.log(title)
        console.log(comment)
        console.log(process.env.NEXT_PUBLIC_DB_BASE_URL)
        const res = axios.post(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/reviews/`)
        /*const csrftoken = getCookie('csrftoken');
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }
        const body ={
            title, 
            content: comment,
            stars,
        }

        const res= axios.post(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/reviews`, body, config)
        console.log(res) */
    }
    return (
        <AddReviewPageStyled>
        <Layout>
            <div className="title">
                {/* TODO */}
                <Typography variant='h3'>Creating a Review For: Business Name</Typography>
            </div>
            <div className="form">
                <FormControl fullWidth className="input">
                    <InputLabel id='stars'>Stars Rating Out of 5</InputLabel>
                    <Select
                        id='starsComponent'
                        label='Stars Rating Out of 5'
                        onChange={e => setStars(e.target.value)}
                        value={stars}
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
                <FormControl className="input"  fullWidth>
                    <TextField
                        label='Title'
                        id='titleComponent'
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </FormControl>
                <FormControl className="input" >
                    <TextField
                    label='Tell us about your experience here'
                    id='commentComponent'
                    multiline
                    minRows={4}
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    />
                </FormControl>
            <Button variant='contained' color='primary' onClick={()=>submitHandler()}>Submit Review</Button>
            </div> 
        </Layout>
        </AddReviewPageStyled>
    )
}



const AddReviewPageStyled = styled('AddReviewPage')({
    "root":{
        marginTop: '75px',
        maxWidth: '95vw'
    },
    ".form": {
        display: 'block',
        marginTop: '35px',
        width: '50%',
        margin: 'auto'
    },
    ".description": {
        paddingTop: '15px',
    },
    ".input":{
        margin: '15px 0',
        width: '100%'
    },
    '@media only screen and (max-width: 768px)':{
        '.form':{
            width: '95%',
            padding: '0 10px',
            margin: '0 auto',
        },
        'button':{
            display: 'block',
            margin: 'auto',
            width: '50%'
        }

    }
})

export default AddReviewPage