import { FormRegister } from "@/components/components/page/register/form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await auth();

    if (session) {
        return redirect("/sucess/approved");
    }
    return (
        <main className="w-full h-screen">
            <div className="grid grid-cols-[1fr,1.7fr] overflow-hidden w-full h-full ">
                <FormRegister />
                <div className="w-full h-full overflow- bg-muted"></div>
            </div>
        </main>
    );
}
