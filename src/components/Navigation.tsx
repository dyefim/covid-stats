import { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Public from '@material-ui/icons/Public';
import Flag from '@material-ui/icons/Flag';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  bottomNav: {
    width: '100%',
    position: 'fixed',
    left: '-2px',
    bottom: 0,
  },
}));

const Navigation = () => {
  const history = useHistory();

  const match = useRouteMatch({
    path: '/countries',
  });

  const changeLocation = (path = '/') => {
    history.push(path);
  };

  const [value, setValue] = useState(() => (match ? '/countries' : '/'));

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
    changeLocation(newValue);
  };

  const classes = useStyles();

  return (
    <BottomNavigation
      className={classes.bottomNav}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        showLabel
        value="/"
        label="World"
        icon={<Public />}
      />
      <BottomNavigationAction
        showLabel
        value="/countries"
        label="Countries"
        icon={<Flag />}
      />
    </BottomNavigation>
  );
};
export default Navigation;
