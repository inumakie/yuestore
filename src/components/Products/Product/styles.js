import { makeStyles } from '@mui/styles';

export default makeStyles( () => ({

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

	cardActions: {
		display: 'flex',
		justifyContent: 'space-between'
	},

	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	productName: {
		color: '#1C2833',
		fontSize: '20px',
		textAlign: 'center',
		textDecoration: 'none',
    	overflow: 'hidden',
    	display: '-webkit-box',
    	'-webkit-line-clamp': '4',
    	'-webkit-box-orient': 'vertical'
	},

	productPrice: {
		color: 'green',
		paddingLeft: '10px'
	}

}));