import React,{ useEffect, useState }  from 'react'
import { NumberInput } from '@mantine/core';


function NumberBox({
    labelValue,
    value,
    idValue,
    classValue,
    nameValue,
    isRequired,
    placeholderValue,
    errorsValue,
    formDataValue,
    onChangeValue,
    onFocusValue,
    onBlurValue,
    minValue,
    maxValue,
    hideControlsValue
}) {
    return (
        <>
            
            <NumberInput 
                label={labelValue}
                value={value}
                id={idValue} 
                 classNames={{
                    label: 'form-label'
                }}
                name={nameValue}
                // required={isRequired}
                placeholder={placeholderValue}
                onChange={(val) => onChangeValue(nameValue, val)}
                onFocus={onFocusValue}
                onBlur={onBlurValue} 
                min={minValue}
                max={maxValue}
                hideControls={hideControlsValue}
                onInput={(e) => {
                    if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10);
                    }
                }}
            />
            
            {errorsValue.formErrors && isRequired && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            {errorsValue.serverErrors && isRequired && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
        </>
    )
}

export default NumberBox