import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

import InputField from "@/components/ui/input/field";
import { ForgotPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    forgotEmail: string;
    forgotPassword: string;
};

export type BaseDiaploProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
};

export const ForgotPasswordDialog = ({ open, setOpen }: BaseDiaploProps) => {
    const [countdown, setCountdown] = useState(0);
    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const isInterval = countdown > 0;

    const onSubmit = async (formData: FormData) => {
        console.log(formData);
        setCountdown(60);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        toast.success("Codigo enviado para o seu Email!");
    };

    return (
        <Dialog
            open={open}
            setOpen={setOpen}
            title="Redefinir Senha"
            description="Um codigo sera enviado para o seu Email cadastrado!"
            content={
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputField
                        control={control}
                        name="forgotEmail"
                        label="Digite o seu email cadastrado"
                        placeholder="robson@example.com"
                        containerClassName="w-full mt-4"
                    />
                    <div className="w-full flex mt-4 ml-auto gap-4 justify-end place-items-end">
                        <InputField
                            control={control}
                            name="code"
                            label="Digite o codigo"
                            placeholder="# Codigo"
                            containerClassName="w-full "
                            disabled={!isInterval}
                        />
                        <Button type="submit" disabled={isInterval}>
                            {isInterval
                                ? `Aguarde ${countdown}s`
                                : "Enviar codigo"}
                        </Button>
                    </div>
                </form>
            }
        >
            <Button
                className="w-ful l border-none"
                variant={"link"}
                type="button"
            >
                Esqueceu a sua senha?
            </Button>
        </Dialog>
    );
};
