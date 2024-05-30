import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( () => ({

	root: {
		maxWidth: '100%',
		boxShadow: '0 4px 8px rgba(147, 112, 219, 0.5)',
		transition: 'box-shadow 0.3s ease-in-out',
		'&:hover': {
			boxShadow: '0 8px 16px rgba(147, 112, 219, 0.7)'
		  },
	},

	media: {
		width: '100%',
		height: '250px',
		marginTop: '20px',
		padding: '5px',
		objectFit: 'contain',
		'&:hover': {
			transform: 'scale(0.98)',
			transition: 'transform 0.5s ease-in-out',
		  },
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
		marginTop: '1rem',
    	overflow: 'hidden',
    	display: '-webkit-box',
    	'-webkit-line-clamp': '4',
    	'-webkit-box-orient': 'vertical'
	},

	productPrice: {
		color: 'green',
		paddingLeft: '10px'
	},

	spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

}));