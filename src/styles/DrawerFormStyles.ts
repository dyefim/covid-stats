import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './ContainerWithDrawerStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(0.25),
  },
  legend: {
    marginLeft: theme.spacing(0.5),
    marginBottom: '10px',
    color: '#777',
  },
  input: {
    width: `calc(${drawerWidth}px - ${theme.spacing(1.5)}px)`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  select: {
    // margin: theme.spacing(0.5),
    width: `calc(${drawerWidth}px - ${theme.spacing(4)}px)`,
  },
  // formControl: {
  // marginTop: theme.spacing(2),
  // marginBottom: theme.spacing(2),
  // },
}));

export default useStyles;
