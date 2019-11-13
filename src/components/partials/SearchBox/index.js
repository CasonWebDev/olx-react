import React from 'react';
import { SearchForm as Form } from './styled';
import { Col } from 'react-bootstrap';

const SearchBox = () => {
	return (
		<Form>
      <Form.Row>
        <Col>
          <Form.Control placeholder="First name" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Form.Row>
    </Form>
	);
}

export default SearchBox;