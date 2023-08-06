export const mediaQuery = (minWidth: number, maxWidth: number) => {
  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
};

const media = {
  xxsmall: mediaQuery(0, 350),
  xsmall: mediaQuery(351, 500),
  small: mediaQuery(501, 1024),
  // medium: mediaQuery(769, 1024),
  large: mediaQuery(1025, 1300),
  xlarge: mediaQuery(1301, 1440),
  xxlarge: mediaQuery(1441, 1919),
};

export default media;
