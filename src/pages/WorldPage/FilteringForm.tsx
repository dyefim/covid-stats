import Typography from '@material-ui/core/Typography';
import { GlobalFilters } from '../../types/filters';
import useCaseTypeSelection, {
  caseOptions,
} from '../../hooks/events/useCaseTypeSelection';
import useDateSelection from '../../hooks/events/useDateSelection';
import { getTodayDate, getNextDay } from '../../utils/dates';
import useStyles from '../../styles/DrawerFormStyles';
import DatePicker from '../../components/forms/DatePicker';
import Select from '../../components/forms/Select';

interface Props {
  globalFilters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
}

const FilteringForm = ({ globalFilters, setGlobalFilters }: Props) => {
  const classes = useStyles();

  const today = getTodayDate();
  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setGlobalFilters);

  const handleCaseTypeSelection = useCaseTypeSelection<GlobalFilters>(setGlobalFilters);

  return (
    <div className={classes.form}>
      <Typography component="legend" className={classes.legend}>
        Pick Date range and Case
      </Typography>

      <DatePicker
        label={'From'}
        name="date_from"
        value={globalFilters.date_from}
        handleChange={handleDateChange}
        max={today}
      />

      <DatePicker
        label={'To'}
        name="date_to"
        value={globalFilters.date_to}
        handleChange={handleDateChange}
        max={tomorrow}
      />

      <Select
        name="cases"
        label="Cases"
        options={caseOptions}
        value={globalFilters.cases}
        handleSelection={handleCaseTypeSelection}
      />
    </div>
  );
};

export default FilteringForm;
