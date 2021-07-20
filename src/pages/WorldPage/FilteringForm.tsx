import Typography from '@material-ui/core/Typography';
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
  setTypeOfCasesGlobal: (caseType: CaseType) => void;
}

const FilteringForm = ({
  globalFilters,
  setGlobalFilters,
  typeOfCasesGlobal,
  setTypeOfCasesGlobal,
}: Props) => {
  const classes = useStyles();

  const today = getTodayDate();
  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setGlobalFilters);

  const handleCaseTypeSelection = useCaseTypeSelection(setTypeOfCasesGlobal);

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
        value={typeOfCasesGlobal}
        handleSelection={handleCaseTypeSelection}
      />
    </div>
  );
};

export default FilteringForm;
