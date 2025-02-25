
// Importing part 
import { ReactNode } from 'react';
import Page from "@/components/dashboard/page";

// Creating and exporting Takeout page as default 
export default function TakeoutPage():ReactNode {
    // Returning JSX
    return (
        <Page className="lg:p-5 lg:pb-5 p-[24px] pb-[100px] flex h-dvh items-center justify-center">
            <h1>Takeout page</h1>
        </Page>
    );
}
