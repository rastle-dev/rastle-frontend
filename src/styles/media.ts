export const mediaQuery = (minWidth: number, maxWidth: number) => {
  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
};

const media = {
  xxsmall: mediaQuery(0, 350),
  xsmall: mediaQuery(351, 500),
  small: mediaQuery(501, 769),
  large: mediaQuery(1025, 1300),
  xlarge: mediaQuery(1301, 1440),
  xxlarge: mediaQuery(1441, 1919),
  mobile: mediaQuery(0, 769),
  pad: mediaQuery(770, 1080),
};

export default media;
