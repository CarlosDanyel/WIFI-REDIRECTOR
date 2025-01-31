import { FormLogin } from "@/components/components/page/login/form";
import { SessionProvider } from "next-auth/react";

export default async function LoginPage() {
    return (
        <SessionProvider>
            <main className="w-full h-screen">
                <div className="grid grid-cols-[1fr,1.7fr] overflow-hidden w-full h-full ">
                    <FormLogin />
                    <div className="w-full h-full overflow- bg-muted"></div>
                </div>
            </main>
        </SessionProvider>
    );
}
