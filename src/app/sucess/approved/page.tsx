import { FormApproved } from "@/components/components/page/approved/form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { toast } from "sonner";

export default async function ApprovedPage() {
    const session = await auth();

    console.log(session);

    if (!session) {
        return redirect("/auth/login");
    }

    return (
        <main className="w-full h-screen">
            <div className="grid grid-cols-[1fr,1.7fr] overflow-hidden w-full h-full ">
                <FormApproved />
                <div className="w-full h-full overflow- bg-muted"></div>
            </div>
        </main>
    );
}
