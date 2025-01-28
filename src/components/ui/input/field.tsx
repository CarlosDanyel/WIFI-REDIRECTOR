"use client";

import { ComponentProps, ReactNode } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from ".";
import { FieldWrapper } from "../field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
    label: string;
    name: string;
    containerClassName?: string;
    extraContent?: (value: string) => ReactNode;
    control?: Control<any, any>;
};

const InputField = ({
    label,
    name,
    required,
    containerClassName,
    extraContent,
    control,
    ...props
}: InputFieldProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required && "Campo obrigatorio*",
            }}
            render={({ field, fieldState }) => (
                <FieldWrapper label={label} className={containerClassName}>
                    <Input {...props} {...field} value={field.value || ""} />
                    {extraContent && extraContent(field.value)}
                    {fieldState.error && (
                        <p className=" text-sm text-red-500 top-16">
                            {fieldState.error.message}
                        </p>
                    )}
                </FieldWrapper>
            )}
        />
    );
};

export default InputField;
