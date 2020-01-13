import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useApi from "helpers/OlxApi";
import { ColAd as Col, OthersAds, Heading1, EmptyBox } from "./styled";
import { Row, Image, Button, Breadcrumb } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import Moment from "react-moment";
import AdItem from "components/partials/AdItem";

import { PageContainer, PageArea } from "components/MainComponents";

const Page = () => {
  const api = useApi();
  const { id } = useParams();

  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async id => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
    };
    getAdInfo(id);
  }, []);

  return (
    <>
      <PageContainer>
        <Row>
          {adInfo.category && (
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href={`/ads?state=${adInfo.stateName}`}>
                {adInfo.stateName}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
              >
                {adInfo.category.name}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{adInfo.title}</Breadcrumb.Item>
            </Breadcrumb>
          )}
        </Row>
        <PageArea>
          <Row>
            <Col className="box" md={7}>
              <Heading1>{adInfo.title || <Skeleton />}</Heading1>
              {adInfo.images ? (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className="each-slide">
                      <Image src={img} width="100%" />
                    </div>
                  ))}
                </Slide>
              ) : (
                <Skeleton height={640} />
              )}
              {adInfo.dateCreated ? (
                <small>
                  {"Publicado em "}
                  <Moment format="DD/MM/YYYY">{adInfo.dateCreated}</Moment>
                </small>
              ) : (
                <Skeleton />
              )}
              <p>{adInfo.description || <Skeleton count={4} />}</p>
              {adInfo.others && (
                <>
                  <h4>Outras ofertas do vendedor</h4>
                  <OthersAds columns={3}>
                    {adInfo.others.map((i, k) => (
                      <AdItem key={k} data={i} />
                    ))}
                  </OthersAds>
                </>
              )}
            </Col>
            <Col md={{ span: 4, offset: 1 }}>
              <Col className="boxRight">
                <div className="precoTitle">
                  {adInfo.priceNegotiable && `Preço Negociável`}
                  {!adInfo.priceNegotiable && adInfo.price ? (
                    <div className="valor">
                      <span>R$</span>
                      <div className="preco">{adInfo.price}</div>
                    </div>
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </Col>
              <Col className="boxRight">
                <div className="visualizacoes">
                  {adInfo.views ? (
                    <p>{`Visualizações: ${adInfo.views}`}</p>
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </Col>
              <EmptyBox>
                {adInfo.userInfo ? (
                  <Button
                    href={`mailto:${adInfo.userInfo.email}`}
                    variant="primary"
                    size="lg"
                    block
                  >
                    Contatar o vendedor
                  </Button>
                ) : (
                  <Skeleton height={40} />
                )}
              </EmptyBox>
              <Col className="boxRight">
                {adInfo.userInfo ? (
                  <strong>{adInfo.userInfo.name}</strong>
                ) : (
                  <Skeleton />
                )}
                {adInfo.userInfo ? (
                  <p className="info">{`E-mail: ${adInfo.userInfo.email}`}</p>
                ) : (
                  <Skeleton />
                )}
                {adInfo.stateName ? (
                  <p className="info">{`Estado: ${adInfo.stateName}`}</p>
                ) : (
                  <Skeleton />
                )}
              </Col>
            </Col>
          </Row>
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
