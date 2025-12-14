import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const signUpFormSchema = z.object({
  restaurantName: z.string().min(3, "O nome do estabelecimento deve ter no mínimo 3 caracteres."),
  managerName: z.string().min(3, "O nome do responsável deve ter no mínimo 3 caracteres."),
  phone: z.string().min(10, "Digite um número de telefone válido."),
  email: z.email("Digite um e-mail válido."),
})

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpFormSchema>();

  async function handleSignUp(data: SignUpFormSchema) {
    
   try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log(data);
  
      toast.success("Restaurante cadastrado com sucesso! Verifique sua caixa de entrada.", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        }
      });
      
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar o restaurante. Tente novamente.");
    }
  }

  return (
    <>
      <Helmet 
        title="Sign-Up"
      />
      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8 ">
          <Link to="/sign-in">
            Fazer login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <div className="">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome do estabelecimento:</Label>
                <Input id="restaurantName" type="text" {...register('restaurantName')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu nome:</Label>
                <Input id="managerName" type="text" {...register('managerName')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Seu telefone:</Label>
                <Input id="phone" type="tel" {...register('phone')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail:</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>

              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar cadastro
              </Button>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar, você concorda com nossos Termos de Serviços e 
                Política de Privacidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}