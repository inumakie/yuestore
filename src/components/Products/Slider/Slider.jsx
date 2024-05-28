import React, { useState } from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { sliderItems } from './slider-data';
import useStyles from './styles';

const Slider = ({ products, filterProd }) => {
    const classes = useStyles();
    const [slideIndex, setSlideIndex] = useState(0);
    const [loadingStates, setLoadingStates] = useState(sliderItems.map(() => true));

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
        }
    };

    const handleImageLoad = (index) => {
        setLoadingStates((prevLoadingStates) => {
            const newLoadingStates = [...prevLoadingStates];
            newLoadingStates[index] = false;
            return newLoadingStates;
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.arrow} style={{ left: '10px' }} onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </div>

            <div className={classes.wrapper} style={{ transition: 'all 1.5s ease', transform: `translateX(${slideIndex * -100}vw)` }}>
                {sliderItems.map((item, index) => (
                    <div
                        className={classes.slide}
                        style={{ background: `linear-gradient(to right, ${item.color1}, ${item.color2})` }}
                        key={item.id}
                        onClick={() => filterProd(item.category)}
                    >
                        <div className={classes.imageContainer}>
                            <div className={classes.imageCircle}>
                                {loadingStates[index] && (
                                    <CircularProgress className={classes.spinner} />
                                )}
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className={classes.img}
                                    onLoad={() => handleImageLoad(index)}
                                    style={{ display: loadingStates[index] ? 'none' : 'block' }}
                                />
                            </div>
                        </div>

                        <div className={classes.infoContainer}>
                            <Typography className={classes.itemTitle} variant="h4">
                                {item.title}
                            </Typography>
                            <Typography className={classes.itemDesc} variant="h5">
                                {item.desc}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>

            <div className={classes.arrow} style={{ right: '10px' }} onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </div>
        </div>
    );
};

export default Slider;
