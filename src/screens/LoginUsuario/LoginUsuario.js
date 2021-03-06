import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';
import { setAuthToken } from '../../api/apiFactory';
import { fetchLogin } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import {
  Alerta,
  AppBody, CampoForm, Container, Divisor, FormFooter, Linha,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';

const defaultValues = {
  login: '',
  senha: '',
};

const LoginUsuario = () => {
  const [values, setValues] = useState(defaultValues);

  const alert = useAlert();
  const history = useHistory();

  const validate = () => {
    if (!values.login) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    if (!values.senha) {
      alert.error('Verifique todos os campos obrigatórios.', { timeout: 5000 });
      return false;
    }

    return true;
  };

  const entrarUsuario = async () => {
    if (!validate()) {
      return;
    }

    const resp = await fetchLogin(values);

    if (resp.message) {
      alert.error('Dados não encontrados.', { timeout: 5000 });
    }

    setAuthToken(resp.token);

    setValues(defaultValues);

    history.push('/');
  };

  return (
    <AppBody>
      <Container>
        <h2>Login de Usuário</h2>

        <Linha style={{ justifyContent: 'flex-end' }}>
          <b><Alerta>* Campos obrigatórios</Alerta></b>
        </Linha>

        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Login</b>
        </div>

        <Divisor />

        <b>
          Login
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
          Senha
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

        <FormFooter>
          <Botao type="submit" label="Entrar" onClick={entrarUsuario} />
        </FormFooter>

      </Container>
    </AppBody>
  );
};

export default LoginUsuario;
