import React,{ useEffect, useState }  from 'react'
import { TextInput } from '@mantine/core';


function TextBox({
    labelValue,
    value,
    idValue,
    classValue,
    nameValue,
    requiredValue,
    placeholderValue,
    errorsValue,
    formDataValue,
    onChangeValue,
    onFocusValue,
    onBlurValue,

}) {
    return (
        <>
            
            <TextInput 
                label={labelValue}
                value={value}
                id={idValue} 
                 classNames={{
                    label: 'form-label'
                }}
                name={nameValue}
                required={requiredValue}
                placeholder={placeholderValue}
                onChange={(e) => onChangeValue(e.target.name, e.target.value)}
                onFocus={onFocusValue}
                onBlur={onBlurValue} 
                
            />
            {errorsValue.formErrors && requiredValue && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            {errorsValue.serverErrors && requiredValue && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
        </>
  )
}

export default TextBox