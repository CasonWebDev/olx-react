import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { CardItem as Card } from "./styled";

import noImg from "img/noimg.png";

const AdItem = props => {
  let cardImg;
  let price = "";

  if (props.data.priceNegotiable) {
    price = "Preço Negociável";
  } else {
    price = `R$ ${props.data.price}`;
  }

  if (props.data.image !== "http://alunos.b7web.com.br:501/media/default.jpg") {
    cardImg = <Card.Img variant="top" src={props.data.image} />;
  } else {
    cardImg = <Card.Img variant="top" src={noImg} />;
  }

  return (
    <Card>
      {props.data.image ? cardImg : <Skeleton height={130} />}
      <Card.Body>
        <Card.Title>{props.data.title || <Skeleton />}</Card.Title>
        <Card.Text>{props.data.price ? price : <Skeleton />}</Card.Text>
        {props.data.id ? (
          <Link to={`/ad/${props.data.id}`}>Veja mais</Link>
        ) : (
          <Skeleton />
        )}
      </Card.Body>
    </Card>
  );
};

export default AdItem;
