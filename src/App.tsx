import { Button } from "./components/ui/button";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button>Enviar</Button>
    </div>
  );
}
