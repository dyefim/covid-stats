import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Public from '@material-ui/icons/Public';
import Flag from '@material-ui/icons/Flag';
import Info from '@material-ui/icons/Info';
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
  const location = useLocation();

  const changeLocation = (path = '/') => {
    history.push(path);
  };

  const [value, setValue] = useState(() => location.pathname || '/');

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
      <BottomNavigationAction
        showLabel
        value="/about"
        label="About"
        icon={<Info />}
      />
    </BottomNavigation>
  );
};
export default Navigation;
