import {
    Dialog as DialogRoot,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./primitive";

import { ReactNode } from "react";

export type BaseDiaploProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    children?: ReactNode;
};

type ForgotPasswordDialogProps = BaseDiaploProps & {
    title: string;
    description: string;
    content?: ReactNode;
};

export const Dialog = ({
    title,
    description,
    children,
    content,
    open,
    setOpen,
}: ForgotPasswordDialogProps) => {
    return (
        <DialogRoot open={open} onOpenChange={setOpen}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {content}
            </DialogContent>
        </DialogRoot>
    );
};
