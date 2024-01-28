import { Link, useRouteError } from "react-router-dom";

interface ErrorPageProps {}

export function ErrorPage({}: ErrorPageProps): JSX.Element | null {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Houston, we have a problem...</h1>

      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você encontra ais detalhes:
      </p>

      <pre>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </pre>

      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
