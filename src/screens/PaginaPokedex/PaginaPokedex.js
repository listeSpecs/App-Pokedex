import React, { useEffect, useState } from 'react';
import { fetchPokemons } from '../../api/endpoints';
import Botao from '../../components/Botao/Botao';
import Carregar from '../../components/Carregar/Carregar';
import GridBotao from '../../components/GridBotao/GridBotao';
import {
  AppBody, CampoForm, Container, ContainerJanela,
  Divisor, Grid, Linha, Janela, Coluna,
} from '../../styles/base';
import { espacamento } from '../../styles/constants/sizes';
import definirCorElemento from '../../util/definirCorElemento';
import { replaceDiacritico } from '../../util/stringFactory';

const defaultValues = {
  BuscaPokemon: '',
};

const PaginaPokedex = () => {
  const [listaPokemons, setListaPokemons] = useState(null);
  const [modalPokemon, setModalPokemon] = useState(false);
  const [dadosPokemon, setDadosPokemon] = useState(null);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    Promise.all([
      fetchPokemons(),
    ]).then(([dadosPokemons]) => {
      setListaPokemons(dadosPokemons);
    });
  }, []);

  if (!listaPokemons) {
    return (
      <Carregar />
    );
  }

  const filtro = listaPokemons && listaPokemons.filter(({ nome }) => {
    const campoFormatado = replaceDiacritico(nome).toLowerCase();
    const buscaFormatado = replaceDiacritico(values.BuscaPokemon).toLowerCase();
    return campoFormatado.includes(buscaFormatado);
  });

  console.log(dadosPokemon);

  return (
    <>
      {modalPokemon ? (
        <ContainerJanela>
          <Janela>
            <Linha style={{ justifyContent: 'flex-end' }}>
              <Botao
                fechar
                onClick={() => setModalPokemon(false)}
              />
            </Linha>
            <div>

              {dadosPokemon
                ? (
                  <>
                    <b>Pokemon selecionado:</b>

                    <Divisor />

                    <Linha />

                    <Coluna>
                      <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                        <b>ID:</b>
                        {' '}
                        {dadosPokemon.id}
                      </p>
                      <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                        <b>Nome:</b>
                        {' '}
                        {dadosPokemon.nome}
                      </p>
                      <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                        <b>Elemento:</b>
                        {' '}
                        {dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null}
                      </p>
                      {dadosPokemon.subElemento ? (
                        <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                          <b>Sub-elemento:</b>
                          {' '}
                          {dadosPokemon.subElemento ? dadosPokemon.subElemento.nomeElemento : null}
                        </p>
                      ) : (null)}
                      <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                        <b>Descrição:</b>
                        :
                        {' '}
                        {dadosPokemon.descricao}
                      </p>
                    </Coluna>
                    {// subelementos
                      }
                    {// fracoContra
                      }

                  </>
                )
                : null}

            </div>
          </Janela>
        </ContainerJanela>
      ) : null}
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
                        id, nome, elemento, imagem, descricao, subElementos, fracoContra,
                      }) => (
                        <GridBotao
                          key={id}
                          label={nome}
                          img={imagem}
                          imgWidth="150"
                          imgHeight="150"
                          cor={definirCorElemento(elemento ? elemento.nomeElemento : null)}
                          onClick={() => {
                            setModalPokemon(true);
                            setDadosPokemon({
                              id, nome, elemento, imagem, descricao, subElementos, fracoContra,
                            });
                          }}
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
                  id, nome, elemento, imagem, descricao, subElementos, fracoContra,
                }) => (
                  <GridBotao
                    key={id}
                    label={nome}
                    img={imagem}
                    imgWidth="150"
                    imgHeight="150"
                    cor={definirCorElemento(elemento ? elemento.nomeElemento : null)}
                    onClick={() => {
                      setModalPokemon(true);
                      setDadosPokemon({
                        id, nome, elemento, imagem, descricao, subElementos, fracoContra,
                      });
                    }}
                  />
                ))}
              </Grid>
            )}

        </Container>
      </AppBody>
    </>
  );
};

export default PaginaPokedex;
