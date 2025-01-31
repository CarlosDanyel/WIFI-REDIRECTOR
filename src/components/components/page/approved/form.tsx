import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

import { BadgeCheck } from "lucide-react";

import Image from "next/image";

export const FormApproved = () => {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/auth/login" });
            }}
            className="p-10 mx-auto w-full max-w-[500px] flex justify-center items-center flex-col gap-6 relative"
        >
            <div className="w-full flex justify-between align-top mb-auto mt-2">
                <Image
                    width={50}
                    height={20}
                    quality={100}
                    src={"/images/logo.png"}
                    alt="Uma vela em volta de um mapa word"
                />
                <ModeToggle />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-center">
                <BadgeCheck size={58} className="mb-6 text-green-700 " />
                <h1 className="text-2xl font-title font-bold">
                    Quase lá! Falta só um clique.
                </h1>
                <p className="text-sm text-muted-foreground flex gap-2">
                    Para concluir sua conexão, clique no botão abaixo.
                </p>
            </div>
            <div className="mb-auto flex flex-col gap-2 w-full mt-3">
                <Button
                    className=" font-medium w-full bg-green-700 text-white hover:bg-green-800"
                    variant={"default"}
                    type="button"
                >
                    Conectar a Internet
                </Button>

                <Button
                    className=" font-medium w-full  text-sm text-muted-foreground"
                    variant={"ghost"}
                    type="submit"
                >
                    Sair da conta?
                </Button>
            </div>
        </form>
    );
};
