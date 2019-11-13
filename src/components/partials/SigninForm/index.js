import React, { useState } from 'react';
import { FormSignin as Form } from './styled';
import { Button, Alert } from 'react-bootstrap';
import useApi from 'helpers/OlxApi';
import { doLogin } from 'helpers/AuthHandler';

const SigninForm = () => {

  const api = useApi();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const json = await api.login(email,password);

    if(json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, remember);
      window.location.href = '/';
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && 
        <Alert 
          variant="danger" 
          onClose={() => { 
            setError(''); 
            setDisabled(false); 
          }} 
          dismissible>
          {error}
        </Alert>
      }
      <Form.Group controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Insira seu e-mail" 
          disabled={disabled} 
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          Nunca compartilharemos seu e-mail com ninguém.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Senha" 
          disabled={disabled}
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required 
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check 
          type="checkbox" 
          label="Lembrar-me" 
          disabled={disabled}
          checked={remember}
          onChange={e=>setRemember(!remember)} 
        />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit" 
        disabled={disabled}
      >
        Entrar
      </Button>
    </Form>
  );
}

export default SigninForm;