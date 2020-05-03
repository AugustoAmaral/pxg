import React from "react";
import {
  withStyles,
  IconButton,
  Button,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import withFormDialog from "../../common/withFormDialog";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import SelectAutoComplete from "../../common/SelectAutoComplete";

const styles = (theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

const professionNames = [
  { label: "Aventureiro", value: "Aventureiro" },
  { label: "Engenheiro", value: "Engenheiro" },
  { label: "Estilista", value: "Estilista" },
  { label: "Professor", value: "Professor" },
];

const ranks = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
];

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
            <SelectAutoComplete
              name="professionName"
              label="Profissão"
              variant="filled"
              className={classes.formControl}
              helperText={errors.professionName}
              error={Boolean(errors.professionName)}
              value={professionNames.find(
                (e) => e.value === values.professionName
              )}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              disabled={isSubmitting}
              options={professionNames}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs>
            <SelectAutoComplete
              name="professionRank"
              label="Rank"
              variant="filled"
              className={classes.formControl}
              helperText={errors.professionRank}
              error={Boolean(errors.professionRank)}
              value={ranks.find((e) => e.value === values.professionRank)}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              disabled={isSubmitting}
              options={ranks}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <FieldArray
          name="materials"
          render={(arrayProps) => {
            return values.materials.map((op, k) => (
              <div key={k}>
                <Grid container justify="space-between" spacing={1}>
                  <Grid item xs={8}>
                    <SelectAutoComplete
                      name={`materials[${k}].name`}
                      label="Nome do item"
                      variant="filled"
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
                      value={dropItems.find(
                        (e) => e.value === values.materials[k].name
                      )}
                      setFieldValue={setFieldValue}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      options={dropItems}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name={`materials[${k}].amount`}
                      label="Quantidade"
                      className={classes.formControl}
                      variant="filled"
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
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        value: Yup.number(),
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
