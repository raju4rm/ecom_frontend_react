import React,{ useEffect, useState }  from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
function SelectBoxComponent({
    optionsValue,
    labelValue,
    isMulti,
    isLoadingProp,
    idValue,
    classValue,
    nameValue, 
    requiredValue,
    defaultOptionValue,
    formDataValue,
    errorsValue,
    onChangeValue,
    isFocusedValue,
    resetValue
}) {
    const animatedComponents = makeAnimated();
    
    const [selectedOption, setSelectedOption] = useState(defaultOptionValue);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(isLoadingProp);
    const [isRtl, setIsRtl] = useState(false);
    const [defaultOptionValueSate, setDefaultOptionValueSate] = useState(defaultOptionValue);
    useEffect(() => {
        setSelectedOption(defaultOptionValue);
    }, [resetValue, defaultOptionValue]);

    
    return (
        <>
            <div className="floating-label-select">
                <label className={`floating-label ${isFocusedValue || selectedOption || defaultOptionValueSate? 'focused' : ''}`}>
                    {labelValue} {requiredValue?(<span className='text-danger ' style={{ fontSize: 17, fontWeight: 'bold !important' }}>*</span>):''}
                </label>
                <Select className={`mt-2 ${classValue}`} 
                    id={idValue} 
                    value={selectedOption}
                    name={nameValue}
                    required={requiredValue}
                    onChange={onChangeValue}
                    options={optionsValue}
                    components={animatedComponents}
                    menuPortalTarget={document.body} 
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                />
                {errorsValue.formErrors && requiredValue && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            
                {errorsValue.serverErrors && requiredValue && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }

                {errorsValue.serverErrors && requiredValue && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
            
            </div>
        </>
    )
}

export default SelectBoxComponent