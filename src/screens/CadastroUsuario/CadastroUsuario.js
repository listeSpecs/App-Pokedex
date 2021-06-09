import React, { useState } from 'react';
import { postUsuario } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import {
  AppBody, CampoForm, Container, Divisor, FormFooter, SelectForm,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';

const listaPerfis = [
  {
    id: '1',
    campo: 'Normal',
  },
  {
    id: '2',
    campo: 'Administrador',
  },
];

const defaultValues = {
  nome: '',
  login: '',
  senha: '',
  perfil: '',
  perfis: '',
};

const CadastroPokemon = () => {
  const [values, setValues] = useState(defaultValues);

  const cadastrarUsuario = async () => {
    await postUsuario(values);

    alert('Usuário cadastrado com sucesso');

    setValues(defaultValues);
  };

  return (
    <AppBody>
      <Container>
        <h2>Cadastro de Usuário</h2>
        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Cadastro</b>
        </div>

        <Divisor />

        <b>Nome do Usuário</b>
        <CampoForm
          id="campo_nomeUsuario"
          value={values.nome}
          onChange={({ target }) => {
            setValues({
              ...values,
              nome: target.value,
            });
          }}
        />

        <Divisor />

        <b>Login do Usuário</b>
        <CampoForm
          id="campo_loginUsuario"
          value={values.login}
          onChange={({ target }) => {
            setValues({
              ...values,
              login: target.value,
            });
          }}
        />

        <Divisor />

        <b>Senha do Usuário</b>
        <CampoForm
          id="campo_senhaUsuario"
          value={values.senha}
          onChange={({ target }) => {
            setValues({
              ...values,
              senha: target.value,
            });
          }}
        />

        <Divisor />

        <b>Perfil de Usuário</b>
        <SelectForm
          id="select_perfil"
          value={values.perfil}
          onChange={({ target }) => {
            setValues({
              ...values,
              perfil: Number(target.value),
              perfis: [Number(target.value)],
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaPerfis && listaPerfis.map(({ id, campo }) => (
            <option key={id} value={id}>{campo}</option>
          ))}
        </SelectForm>

        <Divisor />

        <FormFooter>
          <Botao type="submit" label="Cadastrar" onClick={cadastrarUsuario} />
        </FormFooter>

      </Container>
    </AppBody>
  );
};

export default CadastroPokemon;
