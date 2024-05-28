import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  container: {
    backgroundColor: 'violet',
    width: '100%',
    height: '350px',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '20px',
    '@media (max-width: 1023px)' : {
      display: 'none'
    }
  },
  arrow: {
    width: '50px',
    height: '50px',
    backgroundColor: '#fff7f7',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    bottom: '0',
    margin: 'auto',
    cursor: 'pointer',
    opacity: '0.5',
    zIndex: '2'
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 1.5s ease',
    transform: 'translateX(-100vw)'
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    '&:hover' : {
      cursor: 'pointer'
    }
  }, 
  imageContainer: {
    width: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },   
  imageCircle: {
    width: '300px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: '50%',
    backgroundColor: 'white'
  },
  img: {
    height: '150px'
  },
  infoContainer: {
    width: '500px',
    fontFamily: 'Poppins',
    padding: '60px'
  },
  itemTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    color: 'white',
  },
  itemDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '300',
    color: 'white'
  },

	spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
},

}));