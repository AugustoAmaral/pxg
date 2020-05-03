import React from "react";
import {
  withStyles,
  IconButton,
  Button,
  Divider,
  Grid,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import withFormDialog from "../../common/withFormDialog";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

const styles = (theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    setFieldValue,
    dropItems,
  }) => {
    const addOperatorField = () => {
      setFieldValue("materials", [
        ...values.materials,
        { name: "", amount: 0 },
      ]);
    };
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
        />
        <Grid container justify="space-between" spacing={1}>
          <Grid item xs>
            <TextField
              id="professionName"
              name="professionName"
              label="Profissão"
              margin="normal"
              variant="filled"
              onChange={handleChange}
              value={values.professionName}
              className={classes.formControl}
              helperText={errors.professionName}
              error={Boolean(errors.professionName)}
              select
              required
              fullWidth
            >
              <MenuItem id="Aventureiro" value="Aventureiro">
                Aventureiro
              </MenuItem>
              <MenuItem id="Engenheiro" value="Engenheiro">
                Engenheiro
              </MenuItem>
              <MenuItem id="Estilista" value="Estilista">
                Estilista
              </MenuItem>
              <MenuItem id="Professor" value="Professor">
                Professor
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              id="professionRank"
              name="professionRank"
              label="Rank"
              margin="normal"
              variant="filled"
              onChange={handleChange}
              value={values.professionRank}
              className={classes.formControl}
              helperText={errors.professionRank}
              error={Boolean(errors.professionRank)}
              required
              select
              fullWidth
            >
              <MenuItem id="A" value="A">
                A
              </MenuItem>
              <MenuItem id="B" value="B">
                B
              </MenuItem>
              <MenuItem id="C" value="C">
                C
              </MenuItem>
              <MenuItem id="D" value="D">
                D
              </MenuItem>
              <MenuItem id="E" value="E">
                E
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <FieldArray
          name="materials"
          render={(arrayProps) => {
            return values.materials.map((op, k) => (
              <div key={k}>
                <Grid container justify="space-between" spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                      id={`materials[${k}].name`}
                      name={`materials[${k}].name`}
                      label="Nome do item"
                      margin="normal"
                      variant="filled"
                      onChange={handleChange}
                      value={values.materials[k].name}
                      className={classes.formControl}
                      helperText={
                        errors.materials &&
                        errors.materials[k] &&
                        errors.materials[k].name
                      }
                      error={Boolean(
                        errors.materials &&
                          errors.materials[k] &&
                          errors.materials[k].name
                      )}
                      select
                      fullWidth
                    >
                      {dropItems.map(({ label, value }) => (
                        <MenuItem
                          id={"item" + label}
                          key={"item" + value}
                          value={value}
                        >
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name={`materials[${k}].amount`}
                      label="Quantidade"
                      className={classes.formControl}
                      variant="filled"
                      margin="normal"
                      value={values.materials[k].amount}
                      helperText={
                        errors.materials &&
                        errors.materials[k] &&
                        errors.materials[k].amount
                      }
                      error={Boolean(
                        errors.materials &&
                          errors.materials[k] &&
                          errors.materials[k].amount
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      id="removeButton"
                      className={classes.formControl}
                      onClick={() => arrayProps.remove(k)}
                      aria-label="delete"
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ));
          }}
        />
        <Divider className={classes.divider} />
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>
            <Button
              id="addOperator"
              type="button"
              onClick={() => addOperatorField()}
            >
              Novo material
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
);

const AddProfItemForm = ({ entry, formId, onSubmit, dropItems, ...props }) => {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        name: (entry && entry.name) || "",
        value: (entry && entry.value) || "",
        professionName: (entry && entry.professionName) || "",
        professionRank: (entry && entry.professionRank) || "",
        materials: (entry && entry.materials) || [{ name: "", amount: 0 }],
        ...entry,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        value: Yup.number().required(),
        professionName: Yup.string().required(),
        professionRank: Yup.string().required(),
        materials: Yup.array().of(
          Yup.object().shape({
            amount: Yup.number().required(),
            name: Yup.string().required(),
          })
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit({ ...values });
        setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form {...formikProps} id={formId} dropItems={dropItems} />
      )}
    </Formik>
  );
};

export default withFormDialog(AddProfItemForm);
