// importing images from assets folder //
import audio from '../../../assets/slider-products/slider-audio.jpg';
import music from '../../../assets/slider-products/slider-music.jpg';
import notebooks from '../../../assets/slider-products/slider-notebooks.jpg';

export const sliderItems = [
    {
      id: 1,
      img: audio,
      title: "AUDIO",
      desc: "Audio devices for music listening, recording and streaming.",
      color1: '#654ea3',
      color2: '#eaafc8',
      category: 'audio'
    },
    {
      id: 2,
      img: notebooks,
      title: "NOTEBOOKS",
      desc: "High-end tech at the best price.",
      color1: '#59c173',
      color2: '#5d26c1',
      category: 'notebooks'
    },
    {
      id: 3,
      img: music,
      title: "MUSIC INSTRUMENTS",
      desc: "Guitar, basses, keyboards and percussion instruments.",
      color1: '#c0392b',
      color2: '#8e44ad',
      category: 'music-instruments'
    },
  ];