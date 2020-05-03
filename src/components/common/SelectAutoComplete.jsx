import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SelectAutoComplete = ({ options, setFieldValue, ...props }) => {
  return (
    <Autocomplete
      name={props.name}
      id={props.id}
      options={options}
      onChange={(event, option) =>
        setFieldValue(props.name, option ? option.value : "")
      }
      getOptionLabel={(option) => option.label}
      value={props.value || { value: "", label: "" }}
      renderInput={(params) => <TextField {...params} {...props} />}
      noOptionsText="Não há dados disponíveis"
    />
  );
};

export default SelectAutoComplete;
