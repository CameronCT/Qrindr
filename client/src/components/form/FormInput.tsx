import React, { Component } from 'react';

interface IProps {
    className: string;
    id: string;
    type: string;
    placeholder: string;
    name: string;
    onChange: any;
}

class FormInput extends Component<IProps> {
    render() {
        const { type, placeholder, name, id, className, onChange } = this.props;

        return (
            <div className={className}>
                <div className="font-semibold text-base text-gray-200">{id}</div>
                <input type={type} autoComplete={"false"} spellCheck={false} placeholder={placeholder} name={name} className={"form-control"} onChange={onChange} required />
            </div>
        )
    }
}

export default FormInput;