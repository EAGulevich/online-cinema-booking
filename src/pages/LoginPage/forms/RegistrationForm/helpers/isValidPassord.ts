export const isValidPassword = (password: string) => {
  const hasUpperCase = /[A-ZА-Я]/.test(password);
  const hasDigit = /\d/.test(password);

  return !(password.length < 8 || !hasUpperCase || !hasDigit);
};
