import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getManagedRestaurant } from "~/api/get-managed-restaurant";
import { updateProfile } from "~/api/update-profile";
import { Button } from "./ui/Button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";

const storeProfileFormSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome é obrigatório"),
  description: z.string().nullable(),
});

type StoreProfileFormInput = z.input<typeof storeProfileFormSchema>;

interface StoreProfileDialogProps {}

export function StoreProfileDialog({}: StoreProfileDialogProps): JSX.Element | null {
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileFormInput>({
    resolver: zodResolver(storeProfileFormSchema),
    defaultValues: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  const handleUpdateProfile = handleSubmit(async values => {
    try {
      await updateProfileFn(values);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar o perfil, tente novamente.");
    }
  });

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>

        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleUpdateProfile}>
        <fieldset disabled={isSubmitting}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>

              <Input id="name" className="col-span-3" {...register("name")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>

              <Textarea
                id="description"
                className="col-span-3 resize-none"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" variant="success">
              Salvar
            </Button>
          </DialogFooter>
        </fieldset>
      </form>
    </Fragment>
  );
}
