import React,{ useEffect, useState }  from 'react'
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

function TextBoxFloating({
    labelValue,
    idValue,
    classValue,
    nameValue,
    requiredValue,
    errorsValue,
    formDataValue,
    onChangeValue,
    onFocusValue,
    onBlurValue,
    placeholderValue,
    typeValue,
    value

}) {
    return (
        <>
            <FloatLabel>
                <InputText 
                    className={`form-control mt-2 ${classValue}`}
                    id={idValue} 
                    value={value} 
                    onChange={onChangeValue}
                    onFocus={onFocusValue}
                    onBlur={onBlurValue} 
                    name={nameValue}
                    required={requiredValue}
                    placeholder={placeholderValue}
                    type={typeValue}
                />
                <label htmlFor="username" className='custom_label'>{labelValue}  {requiredValue?(<span className='text-danger ' style={{ fontSize: 17, fontWeight: 'bold !important' }}>*</span>):''}</label>
            </FloatLabel>
            {errorsValue.formErrors && requiredValue && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
            
            {errorsValue.serverErrors && requiredValue && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }

            {errorsValue.serverErrors && requiredValue && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
            
        </>
  )
}

export default TextBoxFloating