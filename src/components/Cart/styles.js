import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  container: {
    minHeight: '100vh',
    height: 'auto',
    marginTop: '15vh',
    paddingBottom: '100px',
    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(229,208,255,1) 100%)'
  },
  title: {
    marginTop: '5%',
    fontFamily: 'Poppins',
    '@media (max-width: 767px)' : {
      paddingTop: '30px'
    },
  },
  emptyText: {
    margin: '10px 0px 100px',
    fontFamily: "'Poppins', sans-serif",
  },
  emptyButton: {
    minWidth: '150px',
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cartDetails: {
    marginTop: '20px',
    padding: '20px 0px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 767px)' : {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  subtotal: {
    fontFamily: 'Poppins',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    margin: '10px 0px',
    '@media (max-width: 767px)' : {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center'

    },
    justifyContent: 'center',
    alignItems: 'center'
  }
}));