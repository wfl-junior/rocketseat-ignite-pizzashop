import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

interface DashboardProps {}

export function Dashboard({}: DashboardProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Dashboard" />
      <h1>Dashboard</h1>
    </Fragment>
  );
}
