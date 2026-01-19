import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const signInFormSchema = z.object({
  email: z.email("Digite um e-mail válido."),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInFormSchema) {
    try {
      await authenticate({ email: data.email });

      toast.success(
        "E-mail enviado com sucesso! Verifique sua caixa de entrada.",
        {
          action: {
            label: "Reenviar",
            onClick: () => handleSignIn(data),
          },
        },
      );
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o e-mail. Tente novamente.");
    }
  }

  return (
    <>
      <Helmet title="Sign-In" />
      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8 ">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail:</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar painel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
