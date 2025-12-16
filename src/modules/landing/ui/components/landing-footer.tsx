import Image from "next/image";

export function LandingFooter() {
    return (
        <footer className="border-t bg-muted/30 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                        <span className="text-xl font-bold tracking-tight">{process.env.NEXT_PUBLIC_APPLICATION_NAME}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APPLICATION_NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}