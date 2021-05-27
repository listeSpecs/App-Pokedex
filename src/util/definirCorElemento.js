const definirCorElemento = (elemento) => {
  if (elemento === 'Fogo') {
    return '#EE8130';
  }
  if (elemento === 'Agua') {
    return '#6390F0';
  }
  if (elemento === 'Dragão') {
    return '#6F35FC';
  }
  if (elemento === 'Elétrico') {
    return '#F7D02C';
  }
  if (elemento === 'Fantasma') {
    return '#735797';
  }
  if (elemento === 'Fada') {
    return '#D685AD';
  }
  if (elemento === 'Gelo') {
    return '#96D9D6';
  }
  if (elemento === 'Inseto') {
    return '#A6B91A';
  }
  if (elemento === 'Lutador') {
    return '#C22E28';
  }
  if (elemento === 'Metálico') {
    return '#B7B7CE';
  }
  if (elemento === 'Normal') {
    return '#A8A77A';
  }
  if (elemento === 'Noturno') {
    return '#705746';
  }
  if (elemento === 'Psíquico') {
    return '#F95587';
  }
  if (elemento === 'Rocha') {
    return '#B6A136';
  }
  if (elemento === 'Terra') {
    return '#E2BF65';
  }
  if (elemento === 'Venenoso') {
    return '#A33EA1';
  }
  if (elemento === 'Voador') {
    return '#A98FF3';
  }
  if (elemento === 'Grama') {
    return '#7AC74C';
  }

  return null;
};

export default definirCorElemento;
