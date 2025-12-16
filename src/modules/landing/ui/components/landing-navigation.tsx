import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LandingNavigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    <span className="text-xl font-bold tracking-tight">{process.env.NEXT_PUBLIC_APPLICATION_NAME}</span>
                </div>
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        How it Works
                    </Link>
                    <Link href="/auth/signin">
                        <Button variant="ghost" size="sm">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button size="sm" className="shadow-lg shadow-primary/20">Get Started</Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}