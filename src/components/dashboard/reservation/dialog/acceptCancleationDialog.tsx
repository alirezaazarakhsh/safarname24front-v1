// Forcing next.js to render this component as client side component 
"use client";

// Importing part
import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { DialogComponentPropsType } from "@/types/dashboard/component";

// Creating and exporting AcceptCanclationDialog component as default
export default function AcceptCanclationDialog({ closeFn, isOpened = false }: DialogComponentPropsType): ReactNode {
    // Returning JSX 
    return (
        <Dialog open={isOpened}>
            <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
                    <DialogHeader>
                        <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">اطلاعات شما با موفقیت ثبت شد</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-right text-sm font-medium text-black">
                        مشترک گرامی عزیز
                        پس از تایید ادمین سفرنامه 24 رزرو شما لغو و با شما تماس گرفته خواهد شد از همراهی شما متشکریم.
                    </DialogDescription>
                <DialogFooter dir="ltr">
                    <DialogClose asChild>
                        <button
                            onClick={closeFn}
                            className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-white bg-green-600"
                        >
                            متوجه شدم
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
