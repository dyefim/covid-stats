import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './ContainerWithDrawerStyles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '5px',
  },
  form: {
    padding: '5px',
  },
  legend: {
    marginLeft: '5px',
    marginBottom: '10px',
    color: '#777',
  },
  input: {
    width: `calc(${drawerWidth}px - 20px)`,
    margin: '5px',
    marginBottom: '20px',
  },
  select: {
    margin: '5px',
    width: `calc(${drawerWidth}px - 25px)`,
  },
}));

export default useStyles;
