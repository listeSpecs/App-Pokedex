import React, { useEffect, useState } from 'react';
import { fetchPokemons, postTreinador } from '../../api/endpoints';
import DesconhecidoPng from '../../assets/imagens/desconhecido.png';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import Botao from '../../components/Botao/Botao';
import {
  AppBody, CampoForm, Container, Divisor, FormFooter, Linha, SelectForm,
} from '../../styles/base';
import { borderRadius, espacamento } from '../../styles/constants/sizes';
import definirCorElemento from '../../util/definirCorElemento';

const defaultValues = {
  NomeTreinador: '',
  IdadeTreinador: '',
  Pokemon1: '',
  Pokemon2: '',
  Pokemon3: '',
};

const CadastroPokemon = () => {
  const [listaPokemons, setListaPokemons] = useState(null);

  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    Promise.all([
      fetchPokemons(),
    ]).then(([dadosPokemons]) => {
      setListaPokemons(dadosPokemons);
    });
  }, []);

  if (!listaPokemons) {
    return null;
  }

  const primeiroPokemon = listaPokemons.find(({ id }) => id === values.Pokemon1);
  const segundoPokemon = listaPokemons.find(({ id }) => id === values.Pokemon2);
  const terceiroPokemon = listaPokemons.find(({ id }) => id === values.Pokemon3);

  const cadastrarTreinador = async () => {
    console.log(values);
    const resposta = await postTreinador(values);

    console.log(resposta);
  };

  return (
    <AppBody>

      <AnimatedBackground />

      <Container>
        <h2>Cadastro de Treinador</h2>
        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Equipe</b>
        </div>

        <Divisor />

        <Linha style={{ justifyContent: 'space-between' }}>
          <div style={{ borderRadius, backgroundColor: primeiroPokemon ? definirCorElemento(primeiroPokemon.elemento.nomeElemento) : 'transparent' }}>
            {values.Pokemon1 ? (<img src={primeiroPokemon.imagem} alt="Primeiro pokemon escolhido" style={{ width: 200, height: 200 }} />) : (<img src={DesconhecidoPng} alt="Pokemon não escolhido" style={{ width: 200, height: 200 }} />)}
          </div>

          <div style={{ borderRadius, backgroundColor: segundoPokemon ? definirCorElemento(segundoPokemon.elemento.nomeElemento) : 'transparent' }}>
            {values.Pokemon2 ? (<img src={segundoPokemon.imagem} alt="Segundo pokemon escolhido" style={{ width: 200, height: 200 }} />) : (<img src={DesconhecidoPng} alt="Pokemon não escolhido" style={{ width: 200, height: 200 }} />)}
          </div>

          <div style={{ borderRadius, backgroundColor: terceiroPokemon ? definirCorElemento(terceiroPokemon.elemento.nomeElemento) : 'transparent' }}>
            {values.Pokemon3 ? (<img src={terceiroPokemon.imagem} alt="Terceiro pokemon escolhido" style={{ width: 200, height: 200 }} />) : (<img src={DesconhecidoPng} alt="Pokemon não escolhido" style={{ width: 200, height: 200 }} />)}
          </div>
        </Linha>

        <Divisor />

        <b>Nome do Treinador</b>
        <CampoForm
          id="campo_nomeTreinador"
          value={values.NomeTreinador}
          onChange={({ target }) => {
            setValues({
              ...values,
              NomeTreinador: target.value,
            });
          }}
        />

        <Divisor />

        <b>Idade do Treinador</b>
        <CampoForm
          id="campo_idadeTreinador"
          value={values.IdadeTreinador}
          onChange={({ target }) => {
            setValues({
              ...values,
              IdadeTreinador: target.value,
            });
          }}
        />

        <Divisor />

        <b>Primeiro Pokemon</b>
        <SelectForm
          id="select_pokemon1"
          value={values.Pokemon1}
          onChange={({ target }) => {
            setValues({
              ...values,
              Pokemon1: Number(target.value),
            });
          }}
        >
          <option value="">&nbsp;</option>
          {listaPokemons && listaPokemons.map(({ id, nome }) => (
            <option key={id} value={id}>{nome}</option>
          ))}
        </SelectForm>

        <Divisor />

        <b>Segundo Pokemon</b>
        <SelectForm
          id="select_pokemon2"
          value={values.Pokemon2}
          onChange={({ target }) => setValues({
            ...values,
            Pokemon2: Number(target.value),
          })}
        >
          <option value="">&nbsp;</option>
          {listaPokemons && listaPokemons.map(({ id, nome }) => (
            <option key={id} value={id}>{nome}</option>
          ))}
        </SelectForm>

        <Divisor />

        <b>Terceiro Pokemon</b>
        <SelectForm
          id="select_pokemon3"
          value={values.Pokemon3}
          onChange={({ target }) => setValues({
            ...values,
            Pokemon3: Number(target.value),
          })}
        >
          <option value="">&nbsp;</option>
          {listaPokemons && listaPokemons.map(({ id, nome }) => (
            <option key={id} value={id}>{nome}</option>
          ))}
        </SelectForm>

        <Divisor />

        <FormFooter>
          <Botao type="submit" label="Cadastrar" onClick={cadastrarTreinador} />
        </FormFooter>

      </Container>
    </AppBody>
  );
};

export default CadastroPokemon;
