import React, { ChangeEvent } from 'react';

interface IProps {
    className: string;
    id: string;
    type: string;
    placeholder: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: IProps) => {
    const { type, placeholder, name, id, className, onChange } = props;

    return (
        <div className={className}>
            <div className="font-semibold text-base text-gray-200">{id}</div>
            <input type={type} autoComplete={"false"} spellCheck={false} placeholder={placeholder} name={name} className={"form-control"} onChange={onChange} required />
        </div>
    )
}

export default FormInput;