import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { postUsuario } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import {
  Alerta,
  AppBody, CampoForm, Container, Divisor, FormFooter, Linha, SelectForm,
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

const CadastroUsuario = () => {
  const [values, setValues] = useState(defaultValues);

  const alert = useAlert();

  const validate = () => {
    if (!values.nome) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }
    if (!values.login) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.senha) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.perfil) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    return true;
  };

  const cadastrarUsuario = async () => {
    if (!validate()) {
      return;
    }

    await postUsuario(values);

    alert.success('Usuário cadastrado com sucesso', { timeout: 5000 });

    setValues(defaultValues);
  };

  return (
    <AppBody>
      <Container>
        <h2>Cadastro de Usuário</h2>

        <Linha style={{ justifyContent: 'flex-end' }}>
          <b><Alerta>* Campos obrigatórios</Alerta></b>
        </Linha>

        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Cadastro</b>
        </div>

        <Divisor />

        <b>
          Nome do Usuário
          {' '}
          <Alerta>*</Alerta>
        </b>
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

        <b>
          Login do Usuário
          {' '}
          <Alerta>*</Alerta>
        </b>
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

        <b>
          Senha do Usuário
          {' '}
          <Alerta>*</Alerta>
        </b>
        <CampoForm
          id="campo_senhaUsuario"
          type="password"
          value={values.senha}
          onChange={({ target }) => {
            setValues({
              ...values,
              senha: target.value,
            });
          }}
        />

        <Divisor />

        <b>
          Perfil de Usuário
          {' '}
          <Alerta>*</Alerta>
        </b>
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

export default CadastroUsuario;
