import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form as BootstrapFrom,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

interface ValidationRule {
  (value: string): string;
}

interface Field {
  name: string;
  label: string;
  type: string;
  // validation?: ValidationRule[];
  [key: string]: any;
}

interface FormProps {
  schema: Field[];
  onSubmit: SubmitHandler<any>;
  initialValues?: Record<string, any>;
}

export function Form({ schema, onSubmit, initialValues }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const [formData, setFormData] = useState<Record<string, any>>(
    initialValues || {}
  );

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    onSubmit(data);
  };

  return (
    <BootstrapFrom onSubmit={handleSubmit(handleFormSubmit)}>
      {schema.map((field: Field) => {
        const { name, label, type, validation = [], ...rest } = field;

        const errorMessages = validation
          .map((rule) => rule(formData[name]))
          .filter((message) => message);

        return (
          <Row key={name} className="mb-3">
            <Col sm={2}>
              <BootstrapFrom.Label>{label}</BootstrapFrom.Label>
            </Col>
            <Col sm={10}>
              {type === 'text' || type === 'email' || type === 'password' ? (
                <InputGroup>
                  <FormControl
                    {...register(name, {
                      // ...(validation as unknown as ValidationRule),
                    })}
                    type={type}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    {...rest}
                  />
                  {errorMessages.length > 0 && (
                    <BootstrapFrom.Text className="text-danger">
                      {errorMessages[0]}{' '}
                    </BootstrapFrom.Text>
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
    </BootstrapFrom>
  );
}
