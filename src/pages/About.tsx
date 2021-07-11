import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const About = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <Button variant="contained" color="primary">
        Hire me!
      </Button>
    </div>
  );
};

export default About;
