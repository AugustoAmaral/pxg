import React from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import withFormDialog from "../../common/withFormDialog";
import { Button, DialogActions } from "@material-ui/core";

const styles = (theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
  selectControl: {
    paddingTop: theme.spacing(1),
  },
});

const Form = withStyles(styles)(
  ({
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    classes,
    id,
    entry,
    onDelete,
  }) => {
    return (
      <form id={id} onSubmit={handleSubmit} noValidate>
        <TextField
          id="name"
          name="name"
          label="Nome do item"
          className={classes.formControl}
          variant="filled"
          value={values.name}
          helperText={errors.name}
          error={Boolean(errors.name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          fullWidth
          required
          autoFocus
        />
        <TextField
          id="value"
          name="value"
          label="Valor NPC"
          className={classes.formControl}
          variant="filled"
          value={values.value}
          helperText={errors.value}
          error={Boolean(errors.value)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          type="number"
          fullWidth
          required
        />
        <DialogActions style={{ marginRight: -10 }}>
          {entry?.objectId && (
            <Button
              id="deleteButton"
              onClick={() => onDelete(entry.objectId)}
              type="button"
              color="secondary"
            >
              Excluir
            </Button>
          )}
        </DialogActions>
      </form>
    );
  }
);

const AddItemForm = ({ entry, formId, onSubmit, onDelete }) => {
  return (
    <Formik
      initialValues={{
        name: (entry && entry.name) || "",
        value: (entry && entry.value) || "",
        ...entry,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        value: Yup.number().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({
          name: values.name,
          value: values.value,
        });
        setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form {...formikProps} id={formId} entry={entry} onDelete={onDelete} />
      )}
    </Formik>
  );
};

export default withFormDialog(AddItemForm);
