import React, { useState } from 'react';
import { Typography} from '@mui/material';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { sliderItems } from './slider-data';
import useStyles from './styles';

const Slider = ({ products, filterProd }) => {

	const classes = useStyles();

	const [slideIndex, setSlideIndex] = useState(0);

	const handleClick = (direction) => {

		if (direction === "left") {
    		setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    		} else {setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)}
		}

	return (
		<div className={classes.container}>

			<div className={classes.arrow} style={{left: '10px'}} onClick={() => handleClick("left")}>
				<ArrowLeftOutlined/>
			</div>

			<div className={classes.wrapper} style={{transition: 'all 1.5s ease', transform: `translateX(${slideIndex * -100}vw)`}}>

		        {sliderItems.map((item) => (
		          <div className={classes.slide} style={{background: `linear-gradient(to right, ${item.color1}, ${item.color2})`}} key={item.id} onClick={() => filterProd(item.category)}>
		          	<div className={classes.imageContainer}>
			          	<div className={classes.imageCircle}>
			              <img src={item.img} alt={item.title} className={classes.img}/>
			            </div>
		          	</div>

		            <div className={classes.infoContainer}>
		              <Typography className={classes.itemTitle} variant="h4">{item.title}</Typography>
		              <Typography className={classes.itemDesc} variant="h5">{item.desc}</Typography>
		            </div>
		          </div>
		        ))}

	        </div>

	        <div className={classes.arrow} style={{right: '10px'}} onClick={() => handleClick("right")}>
				<ArrowRightOutlined/>
			</div>

		</div>
	);
}

export default Slider;