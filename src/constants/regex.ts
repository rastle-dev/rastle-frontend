const REGEX = {
  ID: /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,19}$/,
  MONEY: /\B(?=(\d{3})+(?!\d))/g,
  INTEGER: /^[1-9]\d*$/,
  DAY: /^(0?[1-9]|[1-2][0-9]|3[0-1])$/,
};

export default REGEX;
