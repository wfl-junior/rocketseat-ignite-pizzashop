import { Link } from "react-router-dom";

interface NotFoundProps {}

export function NotFound({}: NotFoundProps): JSX.Element | null {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>

      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
