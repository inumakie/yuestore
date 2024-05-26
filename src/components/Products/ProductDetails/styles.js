import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  //toolbar: theme.mixins.toolbar,

  container: {
    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(229,208,255,1) 100%)',
    '@media (max-width: 959px)': {
      justifyContent: 'center'
    },
  },
  imageCard: {
    marginTop: '50px',
    padding: '50px',
    '@media (max-width: 959px)': {
      padding: '20px'
    },
  },
  media: {
    width: '100%',
    height: '250px',
    objectFit: 'contain'
  },
  productImages: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px'
  },
  assets: {
    width: '50px',
    height: '50px',
    border: '2px solid #C39BD3',
    objectFit: 'contain',
    '&:hover' : {
      cursor: 'pointer'
    },
    '&:focus': {
      border: '2px solid black'
    }
  },
  closeIcon: {
    margin: '5px',
    position: 'absolute',
    right: '7px',
    '@media (max-width: 959px)': {
      display: 'none !important'
    },
  },
    closeIconProd: {
    '@media (min-width: 959px)': {
      display: 'none !important'
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  prodName: {
    paddingRight: '20px',
    '@media (max-width: 959px)': {
      paddingRight: '0px'
    }
  },
  price: {
    color: 'green',
    marginRight: '20px'
  },
  priceAndAddContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 425px)': {
      flexDirection: 'column'
    },
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  qtyButton: {
    border: '1px solid #C39BD3',
    borderRadius: '25px',
    '& Typography'  : {
      padding: '0px 20px'
    },
    '&:hover' : {
      cursor: 'pointer'
    }
  },
  qtyAndCart: {
    display: 'flex',
    '@media (max-width: 425px)': {
      marginTop: '10px'
    },
  }
  
}));