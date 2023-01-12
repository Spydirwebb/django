import { styled } from "@mui/system"
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const AverageReview = ( {value} ) => {
    
    const calculateStars = (value) => {
        let stars = []
        while(value!=0) {
            if(value >= 1) { 
                value-=1 
                stars.push(<StarIcon />)
            }else if(value > 0 && value <= 0.5) {
                value -= 0.5 
                stars.push(<StarHalfIcon />)
            }
        }
        while(stars.length<5){
            stars.push(<StarOutlineIcon />)
        }
        return stars
    }
    
    return (
        <ReviewStyled>
            
            {calculateStars(value)}
            
        </ReviewStyled>
    )
}

const ReviewStyled = styled('AverageReview')({

})

export default AverageReview