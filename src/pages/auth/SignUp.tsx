import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { registerRestaurant } from "~/api/register-restaurant";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

const signUpFormSchema = z.object({
  restaurantName: z
    .string({ required_error: "O nome do restaurante é obrigatório" })
    .min(1, "O nome do restaurante é obrigatório"),
  managerName: z
    .string({ required_error: "O nome do gerente é obrigatório" })
    .min(1, "O nome do gerente é obrigatório"),
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
  phone: z
    .string({ required_error: "O telefone é obrigatório" })
    .min(1, "O telefone é obrigatório"),
});

type SignUpFormInput = z.input<typeof signUpFormSchema>;

interface SignUpProps {}

export function SignUp({}: SignUpProps): JSX.Element | null {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(values: SignUpFormInput) {
    try {
      await registerRestaurantFn(values);

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${values.email}`),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível cadastrar restaurante.");
    }
  }

  return (
    <Fragment>
      <Helmet title="Cadastro" />

      <div className="flex w-full items-center justify-center p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-full max-w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>

            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <fieldset className="space-y-4" disabled={isSubmitting}>
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                <Input id="restaurantName" {...register("restaurantName")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <Input id="managerName" {...register("managerName")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Seu telefone</Label>
                <Input id="phone" type="tel" {...register("phone")} />
              </div>

              <Button type="submit" className="w-full">
                Finalizar cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos{" "}
                <a href="#" className="underline underline-offset-4">
                  termos de serviço
                </a>{" "}
                e{" "}
                <a href="#" className="underline underline-offset-4">
                  políticas de privacidade
                </a>
                .
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
