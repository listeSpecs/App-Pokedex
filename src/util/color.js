/**
 * Normaliza um código de cor hexadecimal para o formato rrggbb.
 * @param {string} c Um código de cor hexadecimal.
 */
export const parseHexString = (c) => {
  if (typeof c !== 'string') return '';

  const color = c[0] === '#' ? c.substr(1) : c;

  if (color.length === 3) {
    return color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  if (color.length !== 6) {
    return '';
  }

  return color;
};

/**
 * Converte um canal de cor hexadecimal para um valor decimal.
 * @param {string} val Número hexadecimal de 2 dígitos.
 */
export const parseRGBChannel = (val) => parseInt(val, 16) || 0;

/**
 * Converte uma cor hexadecimal em um array com os valores rgb decimais.
 * @param {string} c Um código de cor hexadecimal.
 */
export const parseRGBColor = (c) => {
  const color = parseHexString(c);
  if (!color) return [];
  return [
    parseRGBChannel(color.substr(0 * 2, 2)),
    parseRGBChannel(color.substr(1 * 2, 2)),
    parseRGBChannel(color.substr(2 * 2, 2)),
  ];
};

export const isCorClara = (color) => {
  const rgb = (
    typeof color === 'string'
      ? parseRGBColor(color)
      : color
  );
  if (!rgb || !rgb[2]) {
    return false;
  }
  const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luma >= 165;
};

/**
 * Retorna uma cor rgb oposta à luminosidade da cor fornecida.
 * @param {string} color Um código de cor hexadecimal.
 */
export const corReversa = (color) => {
  const rgb = parseRGBColor(color);
  if (!rgb.length || rgb.find((i) => !i)) return 'rgba(0,0,0,.7)';
  return isCorClara(rgb) ? 'rgba(0,0,0,.7)' : 'rgba(255,255,255,.7)';
};
