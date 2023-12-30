import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { sleep } from "~/utils/sleep";

const signinFormSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
});

type SignInFormInput = z.input<typeof signinFormSchema>;

interface SignInProps {}

export function SignIn({}: SignInProps): JSX.Element | null {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormInput>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSignIn(values: SignInFormInput) {
    try {
      console.log(values);
      await sleep(2000);
      toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(values),
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Credenciais inválidas.");
    }
  }

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

          <form onSubmit={handleSubmit(handleSignIn)}>
            <fieldset className="space-y-4" disabled={isSubmitting}>
              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>

              <Button type="submit" className="w-full">
                Acessar painel
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
