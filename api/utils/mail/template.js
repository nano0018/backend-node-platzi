const recoveryMailTemplate = (link) => {
  return `
  <div style="width: 18rem;">
    <h1>Recuperación de contraseña</h1>
    <p>Estimado usuario, ha solicitado recuperar la contraseña. Haga click en el siguiente enlace para restablecerla </p>
    <a href="${link}">Restablecer aquí</a>
  </div>`;
};

module.exports = recoveryMailTemplate;
