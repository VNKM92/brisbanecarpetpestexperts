import Wizard from "./components/Wizard";
import ThemeToggle from "./components/ThemeToggle";

export default function ContactPage() {

    return (
    <body className="bg-background text-foreground transition-colors">
            <main className="px-4 md:px-6 py-8 max-w-7xl mx-auto">
                <div className="flex justify-end mb-6">
                    <ThemeToggle />
                </div>

                <Wizard />
            </main>
    </body>
        
    );

}