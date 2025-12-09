import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) return redirect('/auth/signin');

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full">
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    );
}