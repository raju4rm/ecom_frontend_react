import { PasswordInput } from '@mantine/core';
import { useState } from 'react';

export default function PasswordBox({
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
}) {

  return (
    <>
        <PasswordInput
            label={labelValue}
            value={value}
            id={idValue} 
                classNames={{
                label: 'form-label'
            }}
            name={nameValue}
            // required={isRequired}
            placeholder={placeholderValue}
            onChange={(e) => onChangeValue(e.target.name, e.target.value)}
            onFocus={onFocusValue}
            onBlur={onBlurValue} 
        />
        {errorsValue.formErrors && isRequired && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
        {errorsValue.serverErrors && isRequired && formDataValue[nameValue] && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }
    </>
  );
}