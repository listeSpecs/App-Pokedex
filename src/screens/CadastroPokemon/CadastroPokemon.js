import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { fetchElementos, postPokemons } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import GridBotao from '../../components/GridBotao/GridBotao';
import {
  AppBody, AreaForm, ArquivoForm, CampoForm, Container, Divisor, FormFooter, Grid, SelectForm,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';

const defaultValues = {
  nome: '',
  descricao: '',
  imagem: '',
  elemento: '',
  elementoCampo: '',
  subElemento: '',
  subElementoCampo: '',
};

const CadastroPokemon = () => {
  const [values, setValues] = useState(defaultValues);
  const [listaElementos, setListaElementos] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchElementos(),
    ]).then(([dadosElementos]) => {
      setListaElementos(dadosElementos);
    });
  }, []);

  if (!listaElementos) {
    return null;
  }

  const uploadFoto = (url, options) => {
    const promiseCallback = (resolve, reject) => {
      const getFetchJson = (response) => {
        if (!response.ok) return reject(response);
        return response.json().then(resolve);
      };

      fetch(url, options)
        .then(getFetchJson)
        .catch(reject);
    };
    return new Promise(promiseCallback);
  };

  const adicionarFoto = async (arquivo) => {
    setFoto(arquivo.map((data) => Object.assign(data, {
      preview: URL.createObjectURL(data),
    })));

    const data = new FormData();
    data.append('file', arquivo[0]);

    setValues({
      ...values,
      imagem: `https://pokemon-fatec.s3.sa-east-1.amazonaws.com/${arquivo[0].name}`,
    });

    uploadFoto('https://api-pokemon-fatec.herokuapp.com/upload', {
      method: 'POST',
      body: data,
    });
  };

  const cadastrarPokemon = async () => {
    await postPokemons(values);

    setValues(defaultValues);
    setFoto(null);
    alert('Pokemon cadastrado com sucesso');
  };

  console.log(values);

  return (
    <AppBody>

      <Container>
        <h2>Cadastro de Pokemon</h2>
        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Cadastro</b>
        </div>

        <Divisor />

        <b>Nome do Pokemon</b>
        <CampoForm
          id="campo_nomePokemon"
          value={values.nome}
          onChange={({ target }) => {
            setValues({
              ...values,
              nome: target.value,
            });
          }}
        />

        <Divisor />

        <b>Descrição do Pokemon</b>
        <AreaForm
          id="campo_descricaoPokemon"
          value={values.descricao}
          onChange={({ target }) => {
            setValues({
              ...values,
              descricao: target.value,
            });
          }}
        />

        <Divisor />

        <b>Elemento do Pokemon</b>
        <SelectForm
          id="elemento"
          value={values.elementoCampo}
          onChange={({ target }) => {
            setValues({
              ...values,
              elemento: { id: Number(target.value) },
              elementoCampo: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <b>Sub-elemento do Pokemon</b>
        <SelectForm
          id="select_subElemento"
          value={values.subElementoCampo}
          onChange={({ target }) => {
            setValues({
              ...values,
              subElemento: { id: Number(target.value) },
              subElementoCampo: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <div style={{ marginBottom: espacamento.pequeno, marginTop: espacamento.pequeno }}>
          <Dropzone
            multiple={false}
            onDrop={adicionarFoto}
            maxSize={200000000}
            accept="image/*"
          >
            {({
              getRootProps, getInputProps, isDragActive, isDragReject,
            }) => (
              <>
                <ArquivoForm {...getRootProps()}>
                  <input {...getInputProps()} />
                  <b>{!isDragActive && 'Selecione a foto desejada.'}</b>
                  <b>{isDragActive && !isDragReject && 'Jogue aqui sua foto!'}</b>
                  <b>{isDragReject && 'Arquivo não suportado!'}</b>
                  <b>{ }</b>
                  <span>Escolha a foto do pokemon.</span>
                </ArquivoForm>
              </>
            )}
          </Dropzone>

          <Divisor />

          <Grid>
            {foto && foto.map((arquivo) => (
              <div style={{ position: 'relative' }} key={arquivo.path}>
                <GridBotao
                  key={arquivo.path}
                  img={arquivo.preview}
                  type="arquivo"
                />
              </div>
            ))}
          </Grid>

          {foto && foto.length ? (<Divisor />) : null}
        </div>

        <FormFooter>
          <Botao type="submit" label="Cadastrar" onClick={cadastrarPokemon} />
        </FormFooter>

      </Container>
    </AppBody>
  );
};

export default CadastroPokemon;
