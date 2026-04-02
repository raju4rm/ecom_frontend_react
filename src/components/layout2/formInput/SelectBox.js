import { Select } from '@mantine/core';
import React  from 'react'

function SelectBox({
    labelValue,
    optionsValue,
    idValue,
    classValue,
    nameValue, 
    isRequired,
    placeholderValue,
    errorsValue = { formErrors: false, serverErrors: null },
    formDataValue = {},
    onChangeValue = () => {},
    isFocusedValue,
    resetValue,
    isSearchable,
    isDisabled

}) {
        
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
                value={formDataValue[nameValue]}
                placeholder={placeholderValue}            
                searchable={isSearchable}
                disabled={isDisabled}
                onChange={(value) => onChangeValue(nameValue, value)}
                styles={{
                    dropdown: { zIndex: 9999 }
                }}
            />
            {errorsValue.formErrors && isRequired && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            {errorsValue.serverErrors  && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
        </>
    );
}

export default SelectBox