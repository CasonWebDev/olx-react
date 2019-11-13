import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { NotFoundArea } from './styled';

export default class Page extends Component {
  render() {
    return (
      <NotFoundArea>
        <div className="content">
          <h1>Página não encontrada</h1>
          <Link to="">Home</Link>
        </div>
      </NotFoundArea>
    );
  }
}
