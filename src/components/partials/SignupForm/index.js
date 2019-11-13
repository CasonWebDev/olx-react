import React, { useState, useEffect } from 'react';
import { FormSignin as Form } from './styled';
import { Button, Alert } from 'react-bootstrap';
import useApi from 'helpers/OlxApi';
import { doLogin } from 'helpers/AuthHandler';

const SignupForm = () => {

  const api = useApi();

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [stateList, setStateList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if(password !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }

    const json = await api.register(
      name,
      email,
      password,
      stateLoc
    );

    if(json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
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

      <Form.Group controlId="formBasicName">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Insira seu nome completo" 
          disabled={disabled} 
          value={name}
          onChange={e=>setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Estado</Form.Label>
        <Form.Control 
          as="select" 
          disabled={disabled} 
          value={stateLoc}
          onChange={e=>setStateLoc(e.target.value)}
          required
        >
          <option>Selecione um Estado</option>
          {stateList.map((i,k) => 
            <option key={k} value={i._id}>{i.name}</option>  
          )}
        </Form.Control>
      </Form.Group>

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

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Confirme a Senha" 
          disabled={disabled}
          value={confirmPassword}
          onChange={e=>setConfirmPassword(e.target.value)}
          required 
        />
      </Form.Group>

      <Button 
        variant="primary" 
        type="submit" 
        disabled={disabled}
      >
        Cadastrar
      </Button>
    </Form>
  );
}

export default SignupForm;