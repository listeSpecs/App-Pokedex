import React, { useEffect, useState } from 'react';
import { fetchTreinadores } from '../../api/endpoints';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import {
  AppBody, Coluna, Container, Divisor, Linha, SelectForm,
} from '../../styles/base';
import { borderRadius, espacamento } from '../../styles/constants/sizes';
import definirCorElemento from '../../util/definirCorElemento';

const defaultValues = {
  Treinador: '',
};

const PaginaTreinadores = () => {
  const [listaTreinadores, setListaTreinadores] = useState(null);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    Promise.all([
      fetchTreinadores(),
    ]).then(([dadosTreinadores]) => {
      setListaTreinadores(dadosTreinadores);
    });
  }, []);

  if (!listaTreinadores) {
    return null;
  }

  console.log(listaTreinadores);

  console.log(values);

  const treinadorSelecionado = listaTreinadores.find(({ id }) => id === values.Treinador);

  return (
    <AppBody>

      <AnimatedBackground />

      <Container>
        <h2>Listagem de Treinadores</h2>

        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Treinadores</b>
        </div>

        <Divisor />

        <b>Selecione o Treinador</b>
        <SelectForm
          id="select_pokemon1"
          value={values.Treinador}
          onChange={({ target }) => {
            setValues({
              ...values,
              Treinador: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaTreinadores && listaTreinadores.map(({ id, nome }) => (
            <option key={id} value={id}>{nome}</option>
          ))}
        </SelectForm>

        <Divisor />

        {treinadorSelecionado ? (
          <>
            <div>
              <Linha style={{ borderBottom: '1px solid #cc0000', justifyContent: 'space-between', padding: espacamento.extraPequeno }}>
                <b style={{ marginRight: 5 }}>Registro</b>
                {treinadorSelecionado.id}
              </Linha>
              <Linha style={{ borderBottom: '1px solid #cc0000', justifyContent: 'space-between', padding: espacamento.extraPequeno }}>
                <b style={{ marginRight: 5 }}>Nome</b>
                {treinadorSelecionado.nome}
              </Linha>
              <Linha style={{ borderBottom: '1px solid #cc0000', justifyContent: 'space-between', padding: espacamento.extraPequeno }}>
                <b style={{ marginRight: 5 }}>Idade</b>
                {treinadorSelecionado.idade}
              </Linha>
            </div>

            <div style={{ padding: espacamento.extraPequeno }}>
              <b>Pokemons</b>

              <Linha style={{ justifyContent: 'space-between' }}>
                {treinadorSelecionado.pokemons.map(({
                  elemento, id, imagem, nome, subelemento,
                }) => (
                  <Coluna style={{ alignItems: 'center' }}>
                    <p style={{ borderBottom: '1px solid', borderColor: definirCorElemento(elemento.nomeElemento) }}>{nome}</p>
                    <div style={{ borderRadius, backgroundColor: definirCorElemento(elemento.nomeElemento) }}>
                      <img src={imagem} alt="Pokemons" style={{ width: 200, height: 200 }} />
                    </div>
                  </Coluna>
                ))}
              </Linha>
            </div>
          </>
        ) : (
          null
        )}
      </Container>
    </AppBody>
  );
};

export default PaginaTreinadores;
