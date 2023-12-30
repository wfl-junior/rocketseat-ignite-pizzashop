import { Button } from "./components/ui/button";

interface AppProps {}

export function App({}: AppProps): JSX.Element | null {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button>Enviar</Button>
    </div>
  );
}
