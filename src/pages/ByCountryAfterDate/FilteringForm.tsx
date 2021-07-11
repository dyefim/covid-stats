import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Countries, FiltersForLiveData } from '../../App';
import useCaseTypeSelection, {
  caseOptions,
} from '../../hooks/events/useCaseTypeSelection';
import useDateSelection from '../../hooks/events/useDateSelection';
import { getNextDay } from '../../utils/dates';
import useStyles from '../../styles/DrawerFormStyles';

interface Props {
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: (filters: FiltersForLiveData) => void;
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
}

const FilteringForm = ({
  filtersForLiveData,
  setFiltersForLiveData,
  countries,
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const classes = useStyles();

  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setFiltersForLiveData);

  const handleCaseTypeSelection = useCaseTypeSelection(setFiltersForLiveData);

  const handleCountriesSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    event.preventDefault();

    const values = event.target.value;

    // FIXME restrict selecting to much or to often

    setSelectedCountries(values as string[]);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.form}>
        <Typography component="legend" className={classes.legend}>
          Pick Countries and Date
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
              max: tomorrow,
            }}
            value={filtersForLiveData.date_from}
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
            value={filtersForLiveData.typeOfCases}
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

      <FormControl className={classes.select}>
        <InputLabel id="countries-label">Countries</InputLabel>
        <Select
          labelId="countries-label"
          id="countries"
          multiple
          value={selectedCountries}
          onChange={handleCountriesSelection}
          input={<Input />}
          renderValue={(selected) => {
            return (selected as string[])
              .map((slug) => {
                return countries[slug]?.Country || slug;
              })
              .join(', ');
          }}
        >
          {Object.entries(countries).map(([slug, { Country: countryName }]) => (
            <MenuItem key={slug} value={slug}>
              <Checkbox checked={selectedCountries.indexOf(slug) > -1} />
              <ListItemText primary={countryName || slug} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilteringForm;
