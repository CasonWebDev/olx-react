import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormSignin as Form } from "./styled";
import MaskedInput from "react-text-mask";
import { Button, Alert } from "react-bootstrap";
import useApi from "helpers/OlxApi";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageResize from "filepond-plugin-image-resize";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImageResize,
  FilePondPluginImagePreview
);

const SigninForm = () => {
  const api = useApi();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    let errors = [];

    if (!title.trim()) {
      errors.push("Sem título");
    }
    if (!category) {
      errors.push("Categoria não selecionada");
    }
    if (errors.length === 0) {
      const fData = new FormData();
      fData.append("title", title);
      fData.append("price", price);
      fData.append("priceneg", priceNegotiable);
      fData.append("desc", description);
      fData.append("cat", category);

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          fData.append("img", images[i]);
        }
      }

      const json = await api.addAd(fData);

      if (!json.error) {
        history.push(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }
    } else {
      setError(errors);
    }

    setDisabled(false);
  };

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ","
  });

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert
          variant="danger"
          onClose={() => {
            setError("");
            setDisabled(false);
          }}
          dismissible
        >
          <h5>Erro ao cadastrar anúncio, verifique-os abaixo:</h5>
          {error.map((i, k) => (
            <li key={k}>{i}</li>
          ))}
        </Alert>
      )}
      <Form.Group controlId="titulo">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Título"
          disabled={disabled}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="categoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          as="select"
          placeholder="Categora"
          disabled={disabled}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Selecione uma categoria</option>
          {categories &&
            categories.map(i => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Descrição"
          disabled={disabled}
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="5"
        />
      </Form.Group>
      <Form.Group controlId="imagens">
        <Form.Label>Imagens</Form.Label>
        <FilePond
          allowMultiple={true}
          files={images}
          allowImageResize={true}
          imageResizeTargetWidth={800}
          imageResizeTargetHeight={600}
          imageResizeUpscale={true}
          disabled={disabled}
          imageResizeMode="contain"
          labelIdle='Arraste seus arquivos aqui ou <span class="filepond--label-action"> Clique para procurar </span>'
          onupdatefiles={fileItems => {
            setImages(fileItems.map(fileItem => fileItem.file));
          }}
        />
      </Form.Group>
      <Form.Group controlId="preco">
        <Form.Label>Preço</Form.Label>
        <MaskedInput
          className="form-control"
          placeholder="R$"
          mask={priceMask}
          disabled={disabled || priceNegotiable}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="checkbox">
        <Form.Check
          type="checkbox"
          label="Preço negociável"
          disabled={disabled}
          checked={priceNegotiable}
          onChange={e => setPriceNegotiable(!priceNegotiable)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled}>
        Adicionar Anúncio
      </Button>
    </Form>
  );
};

export default SigninForm;
