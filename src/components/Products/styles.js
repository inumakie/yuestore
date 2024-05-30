import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(229,208,255,1) 100%)',
    padding: theme.spacing(3),
    '@media (max-width: 767px)' : {
      marginTop: '70px'
    },
    '@media (min-width:768px) and (max-width:1024px)': {
      marginTop: '50px'
    },
  },
  select: {
    height: '30px',
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    fontFamily: 'Poppins',
    fontSize: '12px',
    margin: '25px 5px',
    padding: '5px 5px',
    border: '2px solid #C39BD3',
    borderRadius: '25px',
    '@media (min-width: 1024px)' : {
      display: 'none',
    },
  },
  root: {
    flexGrow: 1,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: '100px'
},
}));