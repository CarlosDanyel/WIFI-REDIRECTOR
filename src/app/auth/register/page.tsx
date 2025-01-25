"use client";

import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input/field";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const defaultValues = {
    user: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  };

  const onsubmit = (data: UserInfo) => {
    console.log(data);
    toast.success("Conta criada com sucesso");
    reset();
  };
  const { control, handleSubmit, reset } = useForm<UserInfo>({
    defaultValues: defaultValues,
  });
  return (
    <main className="w-full h-screen">
      <div className="grid grid-cols-[1fr,2fr] overflow-hidden w-full h-full ">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="p-10 mx-auto w-full max-w-[600px] flex justify-center flex-col gap-6 relative"
        >
          <div className="w-full flex justify-between align-top mb-auto">
            <Image
              width={50}
              height={20}
              quality={100}
              src={"/images/logo.png"}
              alt="Uma vela em volta de um mapa word"
            />
            <ModeToggle />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-title font-bold">
              Criar uma nova conta
            </h1>
            <p className="text-sm text-muted-foreground flex gap-2">
              Já possui conta?{" "}
              <Link
                className="text-foreground flex gap-2 items-center font-semibold"
                href={"/auth/login"}
              >
                Entrar agora
                <ArrowRight size={18} />
              </Link>
            </p>
          </div>
          <div className="flex gap-5 mt-6 ">
            <InputField
              control={control}
              name="user.name"
              label="Nome Completo"
              placeholder="Rober Silva Santos"
              containerClassName="w-full"
              required
            />
            <InputField
              control={control}
              name="user.phone"
              label="Celular"
              placeholder="xx xxxxx xxxxxx"
              containerClassName="w-full"
              required
            />
          </div>
          <InputField
            control={control}
            name="user.email"
            label="Email"
            placeholder="robson@example.com"
            containerClassName="w-full"
            required
          />
          <InputField
            control={control}
            name="user.password"
            label="Senha"
            placeholder="Digite uma senha segura"
            containerClassName="w-full"
            required
          />
          <Button
            className="mb-auto font-semibold  bg-blue-700 text-white hover:bg-blue-800"
            variant={"default"}
            type="submit"
          >
            Cadastre-se
          </Button>
        </form>
        <div className="w-full h-full overflow-hidden">
          <Image
            className="w-full h-full overflow-hidden"
            width={1000}
            height={800}
            src="/images/bg-login.jpg"
            alt="uma criança no meio de uma rua que esta com lama"
          />
        </div>
      </div>
    </main>
  );
}
