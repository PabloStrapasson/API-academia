export function registrationGenerator(lenght) {
  let registration = '';
  for (let i = 0; i < lenght; i++) {
    registration += Math.trunc(Math.random() * 10);
  }

  return registration;
}
