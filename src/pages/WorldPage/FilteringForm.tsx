import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CaseType, GlobalFilters } from '../../App';
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
  setGlobalFilters: (filters: GlobalFilters) => void;
  typeOfCasesGlobal: CaseType;
  setTypeOfCasesGlobal: (caseType: CaseType) => void
}

const FilteringForm = ({ globalFilters, setGlobalFilters, typeOfCasesGlobal, setTypeOfCasesGlobal }: Props) => {
  const classes = useStyles();

  const today = getTodayDate();
  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setGlobalFilters);

  const handleCaseTypeSelection = useCaseTypeSelection(setTypeOfCasesGlobal);

  return (
    <div className={classes.root}>
      <Grid container className={classes.form}>
        <Typography component="legend" className={classes.legend}>
          Pick Date range and Case
        </Typography>

        <DatePicker
          className={classes.input}
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
          className={classes.input}
        />

        <Select
          name="cases"
          label="Cases"
          options={caseOptions}
          value={typeOfCasesGlobal}
          handleSelection={handleCaseTypeSelection}
          className={classes.input}
        />
      </Grid>
    </div>
  );
};

export default FilteringForm;
