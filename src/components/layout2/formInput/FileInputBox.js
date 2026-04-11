import { FileInput } from '@mantine/core';

export default function FileInputBox({
  labelValue,
  placeholderValue,
  idValue,
  classValue,
  nameValue,
  isRequired,
  errorsValue = { formErrors: false, serverErrors: null },
  onChangeValue = () => {},
  formDataValue = {},
  onFocusValue,
  onBlurValue,
  allowedTypeValue = [],
  allowedSizeValue
}) {

  return (
    <>
      <FileInput 
        clearable 
        label={labelValue}
        id={idValue} 
          classNames={{
            label: 'form-label'
        }}
        name={nameValue}
        required={isRequired}
        placeholder={placeholderValue}
        onChange={(file) => onChangeValue(nameValue, file)}
        onFocus={onFocusValue}
        onBlur={onBlurValue} 
      />
      {errorsValue.formErrors && isRequired && !formDataValue[nameValue] && <small id="username2-help" className="p-error block">{labelValue} field is required.</small> }
      {errorsValue.formErrors  && formDataValue[nameValue] && !allowedTypeValue.includes(formDataValue[nameValue].type) && <small id="username2-help" className="p-error block">{labelValue} invalid file type. Select {allowedTypeValue.map(type => type.split("/")[1]).join(", ")}</small> }
      {errorsValue.serverErrors  && <small id="username2-help" className="p-error block">{errorsValue.serverErrors[nameValue]}</small> }

    </>
  )
}