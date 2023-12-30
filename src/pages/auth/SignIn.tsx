import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

interface SignInProps {}

export function SignIn({}: SignInProps): JSX.Element | null {
  return (
    <Fragment>
      <Helmet title="Login" />

      <div className="p-8">
        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>

            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={event => event.preventDefault()}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" />
            </div>

            <Button type="submit" className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
