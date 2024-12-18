type InputProps = {
    id?: any;
    type: string;
    placeholder: string;
    labelTitle?: string;
    value?: string | number | readonly string[];
    arrValue?: string[];
    min?: number;
    max?: number;
    onChange?: (e?: any) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    inputStyles?: string;
}

function MainInput({ id, type, placeholder, labelTitle, value, arrValue, min, max, onChange, required=true, disabled, className, inputStyles } : InputProps) {
    return (
        <div className="w-full">
            <div className="relative w-full">
                <input
                    className={`
                        peer w-full bg-white placeholder:text-slate-400 
                        text-base border border-slate-200 px-3 py-2 transition duration-300 ease
                        hover:border-slate-300 shadow-sm focus:shadow rounded-lg
                        focus:outline-2 focus:outline-hovers text-black max-w-full
                        ${disabled ? '!bg-gray-500 border-none' : ''} ${inputStyles}
                    `}
                    id={`input-field-${id || placeholder}`}
                    type={type}
                    value={value || ''}
                    min={min}
                    max={max}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                />
                <label
                    className={`
                        absolute cursor-text bg-white px-2 left-1 top-2 text-slate-400
                        text-base transition-all transform origin-right max-w-[calc(100%-10px)] text-nowrap overflow-hidden text-ellipsis
                        ${(arrValue && arrValue.length !== 0 && arrValue[0] !== '') || (!arrValue && value) ?
                            "!-top-4 left-0 scale-90 rounded-lg px-2" :
                            "peer-focus:-top-4 peer-focus:left-0 peer-focus:scale-90 peer-focus:rounded-lg peer-focus:px-2"}
                        ${className}    
                    `}
                    title={labelTitle}
                    htmlFor={`input-field-${id || placeholder}`} /**** */
                >
                    { placeholder }
                </label>
            </div>
        </div>
    )
}

export default MainInput