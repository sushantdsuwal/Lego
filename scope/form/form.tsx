import React from 'react';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form as BootstrapForm,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { object, StringSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Field {
  name: string;
  label: string;
  type: string;
  validation?: StringSchema<string>;
}
interface FormProps {
  schema: Field[];
  onSubmit: SubmitHandler<Record<string, any>>;
  initialValues?: Record<string, any>;
}

export function Form({ schema, onSubmit, initialValues }: FormProps) {
  const yupValidationSchema = schema?.reduce((acc, field) => {
    if (field.validation) {
      acc[field.name] = field.validation;
    }
    return acc;
  }, {} as Record<string, StringSchema<string>>);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(object(yupValidationSchema)),
  });

  const [formData, setFormData] = useState<Record<string, string>>(
    initialValues || {}
  );

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    onSubmit(data);
  };

  return (
    <BootstrapForm onSubmit={handleSubmit(handleFormSubmit)}>
      {schema?.map((field: Field) => {
        const { name, label, type, validation = {}, ...rest } = field;

        return (
          <Row key={name} className="mb-3">
            <Col sm={2}>
              <BootstrapForm.Label>{label}</BootstrapForm.Label>
            </Col>
            <Col sm={10}>
              {type === 'text' || type === 'email' || type === 'password' ? (
                <InputGroup>
                  <FormControl
                    {...register(name)}
                    type={type}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    {...rest}
                  />
                  {errors[name] && (
                    <BootstrapForm.Text className="text-danger">
                      <>{errors[name]?.message}</>
                    </BootstrapForm.Text>
                  )}
                </InputGroup>
              ) : null}
            </Col>
          </Row>
        );
      })}
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </BootstrapForm>
  );
}
