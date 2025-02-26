// Forcing next.js to render this component as client side component 
"use client";

// Importing part
import { DialogComponentPropsType } from "@/types/dashboard/component";
import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import IconsaxIcons from "@/components/icons/iconsaxIcons";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Creating and exporting CanclationReasonDialog as deafult 
export default function CanclationReasonDialog({ closeFn, isOpened }: DialogComponentPropsType): ReactNode {
    // Returning JSX 
    return (
        <Dialog open={isOpened}>
            <DialogContent className="lg:w-[500px] w-[calc(100vw-25px)] p-0 gap-0">
                <div className="px-6 py-3 border-b border-b-black/10 flex items-center justify-between gap-3">
                    <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black block truncate w-full">اطلاعات شما با موفقیت ثبت شد</DialogTitle>
                    <DialogClose asChild>
                        <button onClick={closeFn} className="shrink-0" type="button">
                            <IconsaxIcons name="CloseCircle" className="w-4 h-4 text-black" />
                        </button>
                    </DialogClose>
                </div>
                <form action="#" className="p-6 grid lg:grid-cols-3 grid-cols-1 gap-[17px]">
                    <div className="flex flex-col gap-3">
                        {
                            [
                                "منصرف شدم",
                                "از جای دیگه سفارش میدهم",
                                "پشتیبانی خوبی ندیدم",
                                "مبلغ بسیار زیاد روی هتل ها"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-start gap-2 overflow-hidden">
                                    <Checkbox id={`canclation-reason-${index + 1}`} className="shrink-0" />
                                    <Label htmlFor={`canclation-reason-${index + 1}`} className="truncate block text-right w-full">{item}</Label>
                                </div>
                            ))
                        }
                        <Button variant="default" className="w-full mt-3">ارسال کنسلی</Button>
                    </div>
                    <Textarea className="col-span-2 resize-none h-full" placeholder="توضیحات خود را وارد نمایید..." />
                </form>
            </DialogContent>
        </Dialog>
    );
}
