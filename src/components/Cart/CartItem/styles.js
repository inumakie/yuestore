import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%'
  },
  media: {
    width: '100%',
    height: '250px',
    marginTop: '20px',
    padding: '5px',
    objectFit: 'contain',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '10px'
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
  productName: {
    fontSize: '20px',
    textAlign: 'center',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '4',
    '-webkit-box-orient': 'vertical'
  }
}));