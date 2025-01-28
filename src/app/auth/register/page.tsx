"use client";

import "dotenv/config";

import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input/field";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import RegisterAction from "../register/regsiterAction";

export default function LoginPage() {
    const defaultValues = {
        name: "",
        phone: "",
        email: "",
        password: "",
    };

    const { control } = useForm<UserData>({
        defaultValues: defaultValues,
    });

    return (
        <main className="w-full h-screen">
            <div className="grid grid-cols-[1fr,1.7fr] overflow-hidden w-full h-full ">
                <form
                    action={RegisterAction}
                    className="p-10 mx-auto w-full max-w-[500px] flex justify-center flex-col gap-6 relative"
                >
                    <div className="w-full flex justify-between align-top mb-auto ">
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
                            Entrar na sua Conta
                        </h1>
                        <p className="text-sm text-muted-foreground flex gap-2">
                            Não possui conta?
                            <Link
                                className="text-foreground flex gap-2 items-center font-semibold"
                                href={"/auth/register"}
                            >
                                Criar agora
                                <ArrowRight size={18} />
                            </Link>
                        </p>
                    </div>
                    <div className="flex gap-5 mt-6">
                        <InputField
                            control={control}
                            name="name"
                            label="Nome Completo"
                            placeholder="Rober Silva Santos"
                            containerClassName="w-full"
                            required
                        />
                        <InputField
                            control={control}
                            name="phone"
                            label="Celular"
                            placeholder="xx xxxxx xxxxxx"
                            containerClassName="w-full"
                            required
                        />
                    </div>
                    <InputField
                        control={control}
                        name="email"
                        label="Email"
                        placeholder="robson@example.com"
                        containerClassName="w-full"
                        required
                    />
                    <InputField
                        control={control}
                        name="password"
                        label="Senha"
                        placeholder="Digite uma senha segura"
                        containerClassName="w-full"
                        required
                    />
                    <div className="mb-auto flex gap-2">
                        <Button
                            className=" font-medium w-full bg-red-700 text-white hover:bg-red-800"
                            variant={"default"}
                            type="submit"
                        >
                            Entrar na conta
                        </Button>
                        <Button
                            className="w-ful l border-none"
                            variant={"link"}
                            type="submit"
                        >
                            Esqueceu a sua senha?
                        </Button>
                    </div>
                </form>
                <div className="w-full h-full overflow- bg-muted"></div>
            </div>
        </main>
    );
}
