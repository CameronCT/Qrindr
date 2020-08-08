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
        const { type, placeholder, name, id, className } = this.props;

        return (
            <div className={className}>
                <div className="font-semibold text-base text-gray-200">{id}</div>
                <input type={type} placeholder={placeholder} name={name} className={"w-full p-2 bg-gray-900 border-2 border-gray-800 text-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:outline-none"} required />
            </div>
        )
    }
}

export default FormInput;