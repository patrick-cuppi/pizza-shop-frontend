import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signInFormSchema = z.object({
  email: z.email("Digite um e-mail válido."),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInFormSchema>();

  async function handleSignIn(data: SignInFormSchema) {
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log(data);

    toast.success("E-mail enviado com sucesso! Verifique sua caixa de entrada.", {
      action: {
        label: "Reenviar",
        onClick: () => handleSignIn(data),
      }
    });
  }

  return (
    <>
      <Helmet 
        title="Sign-In"
      />
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
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
                <Input id="email" type="email" {...register('email')} />
              </div>
              <Button disabled={isSubmitting} className="w-full" type="submit">Acessar painel</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}