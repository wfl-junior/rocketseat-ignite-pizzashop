import { Toaster } from "sonner";
import { useThemeContext } from "~/contexts/ThemeContext";

interface SonnerProps {}

export function Sonner({}: SonnerProps): JSX.Element | null {
  const { theme } = useThemeContext();

  return <Toaster richColors position="bottom-right" theme={theme} />;
}
