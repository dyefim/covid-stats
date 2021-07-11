import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const About = () => {
  const history = useHistory();

  return (
    <div style={{ paddingTop: 20 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIos />}
        onClick={() => history.push('/')}
      >
        Home
      </Button>

      <hr />

      <Typography variant="h5" component="h5" gutterBottom>
        COVID-19 statistic app
      </Typography>

      <Typography variant="h6" component="h6" gutterBottom>
        Using public API:{' '}
        <Link href="https://covid19api.com/">covid19api.com</Link>
      </Typography>

      <List component="ul">
        Libraries used:
        <ListItem>React with TypeScript</ListItem>
        <ListItem>React-Router</ListItem>
        <ListItem>Material-UI</ListItem>
        <ListItem>recharts</ListItem>
        <ListItem>Jest</ListItem>
      </List>
    </div>
  );
};

export default About;
