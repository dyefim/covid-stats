import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './ContainerWithDrawerStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(0.5),
  },
  form: {
    padding: theme.spacing(0.5),
  },
  legend: {
    marginLeft: theme.spacing(0.5),
    marginBottom: '10px',
    color: '#777',
  },
  input: {
    width: `calc(${drawerWidth}px - ${theme.spacing(1.5)}px)`,
    margin: theme.spacing(2),
    marginBottom: '20px',
  },
  select: {
    margin: theme.spacing(2),
    width: `calc(${drawerWidth}px - ${theme.spacing(4)}px)`,
  },
}));

export default useStyles;
