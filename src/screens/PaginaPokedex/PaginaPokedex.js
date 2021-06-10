import React, { useEffect, useState } from 'react';
import { deletePokemons, fetchPokemons } from '../../api/endpoints';
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

  const deletarPokemon = async (id) => {
    const resp = await deletePokemons(id);
    fetch(`https://api-pokemon-fatec.herokuapp.com/pokemons/${id}`, {
      method: 'DELETE',
    });

    console.log(resp);

    return alert.success('Pokemon deletado com sucesso', { timeout: 5000 });
  };

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

                    <Linha style={{ gap: 15 }}>
                      <div>
                        <img src={dadosPokemon.imagem} alt="Pokemon selecionado" width={200} />
                      </div>
                      <Coluna style={{ flex: 1 }}>
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
                        {dadosPokemon.fracoContra ? (
                          <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                            <b>Fraco contra:</b>
                            {' '}
                            {dadosPokemon.fracoContra[0].nomeElemento}
                            {dadosPokemon.fracoContra[1] ? `, ${dadosPokemon.fracoContra[1].nomeElemento}` : null}
                            {dadosPokemon.fracoContra[2] ? `, ${dadosPokemon.fracoContra[2].nomeElemento}` : null}
                          </p>
                        ) : (null)}
                        <p style={{ borderBottom: '1px solid', flex: 1, borderColor: definirCorElemento(dadosPokemon.elemento ? dadosPokemon.elemento.nomeElemento : null) }}>
                          <b>Descrição:</b>
                          :
                          {' '}
                          {dadosPokemon.descricao}
                        </p>
                      </Coluna>
                    </Linha>

                    <Divisor />

                    <Linha style={{ justifyContent: 'flex-end' }}>
                      <Botao label="Deletar" onClick={() => deletarPokemon(dadosPokemon.id)} />
                    </Linha>
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
