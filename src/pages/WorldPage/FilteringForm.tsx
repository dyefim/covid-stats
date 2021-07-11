import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { GlobalFilters } from '../../App';
import useCaseTypeSelection, {
  caseOptions,
} from '../../hooks/events/useCaseTypeSelection';
import useDateSelection from '../../hooks/events/useDateSelection';
import { getTodayDate, getNextDay } from '../../utils/dates';
import useStyles from '../../styles/DrawerFormStyles';

interface Props {
  globalFilters: GlobalFilters;
  setGlobalFilters: (filters: GlobalFilters) => void;
}

const FilteringForm = ({ globalFilters, setGlobalFilters }: Props) => {
  const classes = useStyles();

  const today = getTodayDate();
  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setGlobalFilters);

  const handleCaseTypeSelection = useCaseTypeSelection(setGlobalFilters);

  return (
    <div className={classes.root}>
      <Grid container className={classes.form}>
        <Typography component="legend" className={classes.legend}>
          Pick Date range and Case
        </Typography>

        <FormControl className={classes.input}>
          <TextField
            fullWidth
            type="date"
            name="date_from"
            id="date_from"
            label="From"
            inputProps={{
              min: '2019-01-01',
              max: today,
            }}
            value={globalFilters.date_from}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl className={classes.input}>
          <TextField
            fullWidth
            type="date"
            name="date_to"
            id="date_to"
            label="To"
            inputProps={{
              min: '2019-01-01',
              max: tomorrow,
            }}
            value={globalFilters.date_to}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl className={classes.input}>
          <TextField
            select
            id="cases"
            label="Cases"
            value={globalFilters.typeOfCases}
            onChange={handleCaseTypeSelection}
            variant="standard"
          >
            {caseOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
    </div>
  );
};

export default FilteringForm;
