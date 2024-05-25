import React,{ useEffect, useState }  from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
function SelectBoxComponent({
    options,
    labelValue,
    isMulti,
    isLoadingProp,
    idValue,
    classValue,
    nameValue, 
    requiredValue,
    defaultOption,
    formDataValue,
    errorsValue,
    onChangeValue
}) {
    const animatedComponents = makeAnimated();
    
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(isLoadingProp);
    const [isRtl, setIsRtl] = useState(false);
    const handleChange = (option) => setSelectedOption(option);
    
    return (
        <>
            <div className="floating-label-select">
                <label className={`floating-label ${isFocused || selectedOption || defaultOption? 'focused' : ''}`}>
                    {labelValue} {requiredValue?(<span className='text-danger ' style={{ fontSize: 17, fontWeight: 'bold !important' }}>*</span>):''}
                </label>
                <Select className={`mt-2 ${classValue}`} 
                    id={idValue} 
                    defaultValue={defaultOption}
                    name={nameValue}
                    required={requiredValue}
                    onChange={onChangeValue}
                    options={options}
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