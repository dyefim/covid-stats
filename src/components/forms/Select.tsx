import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectEvent } from '../../types/events';

interface Props {
  value: string;
  options: string[];
  handleSelection: React.EventHandler<SelectEvent>;
  label?: string;
  name?: string;
  className?: string | undefined;
  max?: string;
}

const Select = ({
  value,
  options,
  handleSelection,
  label = 'Select',
  name = 'select_' + label,
  className,
}: Props) => {
  return (
    <FormControl className={className}>
      <TextField
        select
        id={name}
        label={label}
        value={value}
        onChange={handleSelection}
        variant="standard"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default Select;
