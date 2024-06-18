// Função de login
document.addEventListener('DOMContentLoaded', () => {
  const entrarBtn = document.querySelector('.entrar-btn');
  const msgError = document.getElementById('msgError');

  entrarBtn.addEventListener('click', () => {
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;

      if (usuario.trim() === '' || senha.trim() === '') {
          msgError.innerHTML = '<strong>Preencha todos os campos</strong>';
          return;
      }

      fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usuario, senha })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao fazer login');
          }
          return response.json();
      })
      .then(data => {
          if (data.success) {
              localStorage.setItem('token', data.token); // Armazena o token no localStorage
              localStorage.setItem('userName', data.userName); // Armazena o nome do usuário no localStorage
              localStorage.setItem('email', data.email); // Armazena o email no localStorage
              localStorage.setItem('telefone', data.telefone); // Armazena o telefone no localStorage
              window.location.href = 'index.html'; // Redireciona para a página index.html
          } else {
              throw new Error('Credenciais inválidas');
          }
      })
      .catch(error => {
          msgError.innerHTML = `<strong>${error.message}</strong>`;
      });
  });
});