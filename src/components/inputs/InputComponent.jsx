import React from 'react'
import { Col, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
const Input=({ label, name, placeholder, type, onChange, onFocus, onBlur, errors, value, required, formData,inputSM=8,inputClass='' })=> {
  return (
    <>
      <Form.Group as={Row} className={'col-md-6'} controlId={name}>
        {label?<Form.Label className='fw-bolder control-label fs-5  text-dark' column sm="4" style={{ fontSize: 17, fontWeight: 'bold !important' }}>{label}  {required?(<span className='text-danger ' style={{ fontSize: 17, fontWeight: 'bold !important' }}>*</span>):''}</Form.Label>:''}
        <Col sm={inputSM}><Form.Control
          type={type}
          name={name} 
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          className={`form-control form-control-sm rounded-1 ${inputClass}`}
          autoComplete="off"
        />
          <span className='text-danger'> {errors.formErrors && required && !formData[name] && <span>{label} field is required.</span>}</span>
          <span className='text-danger'> {errors.serverErrors && required && !formData[name] && <span>{errors.serverErrors[name]}</span>}</span>
          <span className='text-danger'> {errors.serverErrors && required && formData[name] && <span>{errors.serverErrors[name]}</span>}</span>
          {/* <span className='text-danger'> {errors.serverErrors && formData[name] && <span>{errors.serverErrors[name]}</span>}</span>   */}
        </Col> 
      </Form.Group> 
    </>
  )
}

const InputComponent = React.memo(Input);
export default InputComponent;