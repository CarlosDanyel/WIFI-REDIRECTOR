"use client";

import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input/field";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authenticate } from "@/lib/actions";
import { ForgotPasswordDialog } from "./forgot-password-dialog";
import { useState } from "react";

export const FormLogin = () => {
    const [open, setOpen] = useState(false);

    console.log(open);

    const defaultValues = {
        email: "",
        password: "",
    };

    const {
        control,
        formState: { isSubmitting },
        handleSubmit,
        reset,
    } = useForm<UserData>({
        defaultValues: defaultValues,
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (userData: UserData) => {
        await authenticate(userData);

        reset();
    };

    return (
        <form
            onSubmit={open ? (e) => e.preventDefault() : handleSubmit(onSubmit)}
            className="p-10 mx-auto w-full max-w-[500px] flex justify-center flex-col gap-6 relative"
        >
            <div className="w-full flex justify-between align-top mb-auto mt-2 ">
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
                    Entrar na Conta
                </h1>
                <p className="text-sm text-muted-foreground flex gap-2">
                    não possui conta?
                    <Link
                        className="text-foreground flex gap-2 items-center font-semibold"
                        href={"/auth/register"}
                    >
                        Criar agora
                        <ArrowRight size={18} />
                    </Link>
                </p>
            </div>

            <InputField
                control={control}
                name="email"
                label="Email"
                placeholder="robson@example.com"
                containerClassName="w-full mt-4"
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
                    disabled={isSubmitting}
                    type="submit"
                >
                    Entrar na conta
                </Button>
                <ForgotPasswordDialog open={open} setOpen={setOpen} />
            </div>
        </form>
    );
};
