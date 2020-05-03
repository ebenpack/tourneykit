import * as React from "react";

export interface FieldProps {
    inputClassName: string;
    label: string;
    name: string;
    value: string;
    setValue: (value: string) => void;
    type?: string;
}

const Field = ({
    inputClassName,
    label,
    name,
    value,
    setValue,
    type = "input",
}: FieldProps) => (
    <div className="field">
        <div className="control">
            <label className="label">{label}</label>
            <input
                className={inputClassName}
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={type}
            />
        </div>
    </div>
);

export default Field;
