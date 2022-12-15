import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  buttons: {
	display: 'flex',
	flex: '1',
	justifyContent: 'center',
	alignItems: 'center',
	'@media (max-width: 599px)' : {
		margin: '10px 0px'
	}
  }

}));

