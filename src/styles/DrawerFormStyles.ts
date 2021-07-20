import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(1),
  },
  legend: {
    color: '#777',
  },
  // input: {
  //   margin: theme.spacing(1),
  // },
}));

export default useStyles;
