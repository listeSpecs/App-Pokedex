import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { verificarLogin } from '../../api/apiFactory';
import { fetchElementos, fetchRegioes, postPokemons } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import Carregar from '../../components/Carregar/Carregar';
import GridBotao from '../../components/GridBotao/GridBotao';
import {
  Alerta,
  AppBody, AreaForm, ArquivoForm, CampoForm, Container, Divisor, FormFooter, Grid, Linha,
  SelectForm,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';

const defaultValues = {
  nome: '',
  descricao: '',
  imagem: '',
  elemento: '',
  subElemento: '',
  fracoContra1: '',
  fracoContra2: '',
  fracoContra3: '',
  regiao: '',
};

const CadastroPokemon = () => {
  const [values, setValues] = useState(defaultValues);
  const [listaElementos, setListaElementos] = useState(null);
  const [listaRegioes, setListaRegioes] = useState(null);
  const [verificacaoLogin, setVerificacaoLogin] = useState(false);
  const [foto, setFoto] = useState(null);

  const alert = useAlert();

  const validate = () => {
    if (!values.nome) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }
    if (!values.descricao) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.imagem) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.elemento) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.regiao) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.regiao) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.fracoContra1 && !values.fracoContra2 && !values.fracoContra3) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    return true;
  };

  useEffect(() => {
    verificarLogin().then((data) => setVerificacaoLogin(data));

    Promise.all([
      fetchElementos(),
      fetchRegioes(),
    ]).then(([dadosElementos, dadosRegioes]) => {
      setListaElementos(dadosElementos);
      setListaRegioes(dadosRegioes);
    });
  }, []);

  if (!listaElementos || !listaRegioes) {
    return (
      <Carregar />
    );
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
    if (!validate()) {
      return;
    }

    if (values.subElemento) {
      await postPokemons({
        nome: values.nome,
        imagem: values.imagem,
        descricao: values.descricao,
        elemento: {
          id: values.elemento,
        },
        subElemento: {
          id: values.subElemento,
        },
        fracoContra: [
          values.fracoContra1
            ? {
              id: values.fracoContra1,
            } : null,
          values.fracoContra2
            ? {
              id: values.fracoContra2,
            } : null,
          values.fracoContra3
            ? {
              id: values.fracoContra3,
            } : null,
        ],
        regiao: {
          id: values.regiao,
        },
      });
    }

    if (!values.subElemento) {
      await postPokemons({
        nome: values.nome,
        imagem: values.imagem,
        descricao: values.descricao,
        elemento: {
          id: values.elemento,
        },
        fracoContra: [
          values.fracoContra1
            ? {
              id: values.fracoContra1,
            } : null,
          values.fracoContra2
            ? {
              id: values.fracoContra2,
            } : null,
          values.fracoContra3
            ? {
              id: values.fracoContra3,
            } : null,
        ],
        regiao: {
          id: values.regiao,
        },
      });
    }

    setValues(defaultValues);
    setFoto(null);
    alert.success('Pokemon cadastrado com sucesso', { timeout: 5000 });
  };

  if (!verificacaoLogin) {
    return (
      <AppBody>

        <Container>
          <h2>Entre para acessar</h2>

          <Divisor />

          <Link to="/login" style={{ color: '#c00' }}>
            Ir para página de login ~
          </Link>
        </Container>
      </AppBody>
    );
  }

  return (
    <AppBody>

      <Container>
        <h2>Cadastro de Pokemon</h2>

        <Linha style={{ justifyContent: 'flex-end' }}>
          <b><Alerta>* Campos obrigatórios</Alerta></b>
        </Linha>

        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Cadastro</b>
        </div>

        <Divisor />

        <b>
          Nome do Pokemon
          {' '}
          <Alerta>*</Alerta>
        </b>
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

        <b>
          Descrição do Pokemon
          {' '}
          <Alerta>*</Alerta>
        </b>
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

        <b>
          Elemento do Pokemon
          {' '}
          <Alerta>*</Alerta>
        </b>
        <SelectForm
          id="elemento"
          value={values.elemento}
          onChange={({ target }) => {
            setValues({
              ...values,
              elemento: Number(target.value),
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
          value={values.subElemento}
          onChange={({ target }) => {
            setValues({
              ...values,
              subElemento: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <b>
          Fraquezas do Pokemon (escolha de uma a três)
          {' '}
          <Alerta>*</Alerta>
        </b>
        <SelectForm
          id="select_fracoContra1"
          value={values.fracoContra1}
          onChange={({ target }) => {
            setValues({
              ...values,
              fracoContra1: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <SelectForm
          id="select_fracoContra2"
          value={values.fracoContra2}
          onChange={({ target }) => {
            setValues({
              ...values,
              fracoContra2: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <SelectForm
          id="select_fracoContra3"
          value={values.fracoContra3}
          onChange={({ target }) => {
            setValues({
              ...values,
              fracoContra3: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaElementos && listaElementos.map(({ id, nomeElemento }) => (
            <option key={id} value={id}>{nomeElemento}</option>
          ))}
        </SelectForm>

        <Divisor />

        <b>
          Região do Pokemon
          {' '}
          <Alerta>*</Alerta>
        </b>
        <SelectForm
          id="select_regiao"
          value={values.regiao}
          onChange={({ target }) => {
            setValues({
              ...values,
              regiao: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaRegioes && listaRegioes.map(({ id, nomeRegiao }) => (
            <option key={id} value={id}>{nomeRegiao}</option>
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
