import React, { useState, useEffect } from 'react';
import { SearchForm as Form } from './styled';
import { Col, Button } from 'react-bootstrap';
import useApi from 'helpers/OlxApi';

const SearchBox = () => {

  const api = useApi();

  const [stateLoc, setStateLoc] = useState('');
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

	return (
		<Form action="/ads">
      <Form.Row>
        <Col>
          <Form.Control name="search" placeholder="O que você procura?" />
        </Col>
        <Col md="auto">
          <Form.Control 
            name="state"
            as="select" 
            value={stateLoc}
            onChange={e=>setStateLoc(e.target.value)}
            required
          >
            <option value="">Selecione um Estado</option>
            {stateList.map((i,k) => 
              <option key={k} value={i.name}>{i.name}</option>  
            )}
          </Form.Control>
        </Col>
        <Col md="auto">
          <Button variant="primary" type="submit">
            Procurar
          </Button>
        </Col>
      </Form.Row>
    </Form>
	);
}

export default SearchBox;