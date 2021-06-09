import React, { useEffect, useState } from 'react';
import { fetchPokemons } from '../../api/endpoints';
import GridBotao from '../../components/GridBotao/GridBotao';
import {
  AppBody, CampoForm, Container, Divisor, Grid, Linha,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';
import definirCorElemento from '../../util/definirCorElemento';
import { replaceDiacritico } from '../../util/stringFactory';

const defaultValues = {
  BuscaPokemon: '',
};

const PaginaPokedex = () => {
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

  /*
  <Coluna>
    <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(elemento ? elemento.nomeElemento : null) }}>
      ID:
      {' '}
      {id}
    </p>
    <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(elemento ? elemento.nomeElemento : null) }}>
      Nome:
      {' '}
      {nome}
    </p>
    <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(elemento ? elemento.nomeElemento : null) }}>
      Elemento:
      {' '}
      {elemento ? elemento.nomeElemento : null}
    </p>
    {subElemento ? (
      <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(elemento ? elemento.nomeElemento : null) }}>
        Sub-elemento:
        {' '}
        {subElemento ? subElemento.nomeElemento : null}
      </p>
    ) : (null)}
  </Coluna>

  */

  const filtro = listaPokemons && listaPokemons.filter(({ nome }) => {
    const campoFormatado = replaceDiacritico(nome).toLowerCase();
    const buscaFormatado = replaceDiacritico(values.BuscaPokemon).toLowerCase();
    return campoFormatado.includes(buscaFormatado);
  });

  return (
    <AppBody>
      <Container>
        <h2>Pokédex</h2>
        <div style={{ borderBottom: '1px solid #cc0000', padding: espacamento.extraPequeno }}>
          <b>Pokémons</b>
        </div>

        <Divisor />

        <Linha>
          <span style={{ marginRight: espacamento.pequeno }}>Procurar pokémon</span>
          <CampoForm
            value={values.BuscaPokemon}
            type="text"
            onChange={({ target }) => setValues({
              ...values,
              BuscaPokemon: target.value,
            })}
          />
        </Linha>

        <Divisor />

        {values.BuscaPokemon
          ? (
            <>
              {filtro.length
                ? (
                  <Grid>
                    {filtro.map(({
                      id, nome, elemento, imagem, subElemento,
                    }) => (
                      <GridBotao
                        key={id}
                        label={nome}
                        img={imagem}
                        imgWidth="150"
                        imgHeight="150"
                        cor={definirCorElemento(elemento ? elemento.nomeElemento : null)}
                      />
                    ))}
                  </Grid>
                )
                : (
                  <p>
                    <p>
                      Nenhum pokémon com a palavra
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>{values.BuscaPokemon}</span>
                      {' '}
                      foi encontrado.
                    </p>
                  </p>
                )}
            </>
          )
          : (
            <Grid>
              {listaPokemons.map(({
                id, nome, elemento, imagem, subElemento,
              }) => (
                <GridBotao
                  key={id}
                  label={nome}
                  img={imagem}
                  imgWidth="150"
                  imgHeight="150"
                  cor={definirCorElemento(elemento ? elemento.nomeElemento : null)}
                />
              ))}
            </Grid>
          )}

      </Container>
    </AppBody>
  );
};

export default PaginaPokedex;
