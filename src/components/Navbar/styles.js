import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme, query) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 767px)' : {
      marginTop: '10px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gridTemplateAreas: `
        "logo cart"
        "search search"
      `
    }
  },
  title: {
    display: 'flex',
    textDecoration: 'none',
    '@media (max-width: 767px)' : {
      gridArea: 'logo',
    }
  },
  image: {
    marginRight: '10px',
  },
  search: {
    width: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    '@media (max-width: 767px)' : {
      gridArea: 'search',
      width: '80vw',
      justifySelf: 'center',
      marginBottom: '10px'
    }
  },
      searchContainer: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      },
          searchInput: {
            width: 'auto',
            height: '100%',
            borderRadius: '10px 0 0 10px',
            border: '2px solid #C39BD3',
            paddingLeft: '10px'
          },
          results: {
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            marginLeft: '5px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '34px',
            borderRadius: '0 0 10px 10px',
            '@media (max-width: 767px)' : {
              width: '55vw',
            },
          },
          searchItem: {
            padding: '5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:nth-child(odd)' : {
              backgroundColor: '#F5EEF8'
            },

            '&:hover' : {
              backgroundColor: '#EBDEF0',
              cursor: 'pointer',
              whiteSpace: 'normal'
            }
          },
  searchIconWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    padding: '5px',
    backgroundColor: '#EBDEF0',
    borderRadius: '0 10px 10px 0',
    '&:hover' : {
      cursor: 'pointer',
      backgroundColor: 'darkgray'
    }
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    marginLeft: '3px',
    color: 'darkgray',
    '&:hover' : {
      cursor: 'pointer',
      color: 'black'
    }
  },
  filterOffIcon: {
    color: 'violet'
  },
  button: {
    '@media (max-width: 767px)' : {
      gridArea: 'cart',
      justifySelf: 'end'
    }
  }
}));