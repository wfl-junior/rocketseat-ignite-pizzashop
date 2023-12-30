import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

interface SignInProps {}

export function SignIn({}: SignInProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Login" />
      <h1>SignIn</h1>
    </Fragment>
  );
}
