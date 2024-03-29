import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { getManagedRestaurant } from "~/api/get-managed-restaurant";
import { getProfile } from "~/api/get-profile";
import { signOut } from "~/api/sign-out";
import { QueryKeys } from "~/lib/react-query";
import { StoreProfileDialog } from "./StoreProfileDialog";
import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Skeleton } from "./ui/Skeleton";

interface AccountMenuProps {}

export function AccountMenu({}: AccountMenuProps): JSX.Element | null {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [QueryKeys.Profile],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: [QueryKeys.ManagedRestaurant],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess() {
      navigate("/sign-in");
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}

            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <Fragment>
                <span>{profile?.name}</span>

                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </Fragment>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer space-x-2"
              disabled={isLoadingManagedRestaurant}
            >
              <Building className="h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            disabled={isSigningOut}
            onSelect={() => signOutFn()}
            className="cursor-pointer space-x-2 text-rose-500 dark:text-rose-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <StoreProfileDialog />
      </DialogContent>
    </Dialog>
  );
}
