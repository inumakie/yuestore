import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

const FormInput = ({ name, label, rules }) => {
  
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue=""
        control={control} //this takes care of registering the component
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            name={name}
            label={label}
            required
            fullWidth
            error={!!error}
            helperText={error ? error.message : null}
          />)}
        rules={rules}
      />
    </Grid>
  );
};

export default FormInput;