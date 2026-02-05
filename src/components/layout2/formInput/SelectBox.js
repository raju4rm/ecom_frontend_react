import { Select } from '@mantine/core';
import React,{ useEffect, useState }  from 'react'

function SelectBox({
    labelValue,
    optionsValue,
    idValue,
    classValue,
    nameValue, 
    isRequired,
    defaultOptionValue,
    placeholderValue,
    formDataValue,
    errorsValue,
    onChangeValue,
    isFocusedValue,
    resetValue,
    isSearchable,
    isDisabled

}) {
        const [selectedOption, setSelectedOption] = useState(defaultOptionValue);
        const [defaultOptionValueSate, setDefaultOptionValueSate] = useState(defaultOptionValue);
        
    return (
        <>
            <Select
                label={labelValue}    
                data={optionsValue}
                id={idValue}
                classNames={{
                    input: {classValue},
                    label: 'form-label'
                }}
                name={nameValue}
                required={isRequired}
                defaultValue={defaultOptionValue}
                placeholder={placeholderValue}            
                searchable={isSearchable}
                disabled={isDisabled}
                onChange={(value) => onChangeValue(nameValue, value)}
            />
            {errorsValue.formErrors && isRequired && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            {errorsValue.serverErrors && isRequired && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
        </>
    );
}

export default SelectBox