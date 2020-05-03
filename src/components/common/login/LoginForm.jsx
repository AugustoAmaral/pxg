import React from "react";
import withDialog from "../withDialog";
import { Formik } from "formik";
import { Grid, makeStyles, Button, TextField } from "@material-ui/core";
import user from "../../../config/User";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  submit: {
    marginTop: theme.spacing(3),
    width: theme.spacing(10),
  },
}));

const FieldForm = ({
  values,
  errors,
  handleChange,
  isSubmitting,
  handleSubmit,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.paper} container justify="center">
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Usuário"
            variant="filled"
            value={values.username}
            helperText={errors.username}
            error={Boolean(errors.username)}
            onChange={handleChange}
            disabled={isSubmitting}
            margin="normal"
            fullWidth
            required
            autoFocus
          />
          <TextField
            name="password"
            label="Senha"
            variant="filled"
            value={values.password}
            helperText={errors.password}
            error={Boolean(errors.password)}
            onChange={handleChange}
            disabled={isSubmitting}
            margin="normal"
            type="password"
            fullWidth
            required
          />
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const LoginForm = ({ onClose }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
      onSubmit={(
        { username, password },
        { setSubmitting, setFieldError, ...props }
      ) => {
        setSubmitting(true);
        user.login({ username, password }).then((res) => {
          if (res.error) {
            setFieldError("username", res.error);
            setSubmitting(false);
          } else {
            user.parseUserInfo({ token: res.sessionToken });
            setSubmitting(false);
            onClose();
          }
        });
      }}
    >
      {(props) => <FieldForm {...props} />}
    </Formik>
  );
};

export default withDialog(LoginForm);
