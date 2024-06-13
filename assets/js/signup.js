document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  const msgError = document.getElementById('msgError');
  const msgSuccess = document.getElementById('msgSuccess');

  signupForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Limpar mensagens de erro e sucesso
      msgError.innerHTML = 'Erro ao cadastrar usuário';
      msgSuccess.innerHTML = 'Sucesso ao cadastrar usuário';

      // Coletar dados do formulário
      const nome = document.getElementById('nome').value;
      const usuario = document.getElementById('usuario').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const confirmSenha = document.getElementById('confirmSenha').value;

      // Validar os campos
      if (nome.trim() === '' || usuario.trim() === '' || telefone.trim() === '' || email.trim() === '' || senha.trim() === '' || confirmSenha.trim() === '') {
          msgError.innerHTML = '<strong>Preencha todos os campos</strong>';
          return;
      }

      if (senha !== confirmSenha) {
          msgError.innerHTML = '<strong>As senhas não coincidem</strong>';
          return;
      }

      // Se todos os campos estiverem preenchidos e as senhas coincidirem, enviar os dados para o servidor
      const dadosUsuario = {
          nome: nome,
          usuario: usuario,
          telefone: telefone,
          email: email,
          senha: senha
      };

      fetch('http://localhost:3000/cadastro', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosUsuario)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao cadastrar usuário');
          }
          return response.json();
      })
      .then(data => {
          msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
          signupForm.reset(); // Limpar o formulário após o cadastro bem-sucedido
          // Redirecionar para a página de login após o cadastro bem-sucedido
          window.location.href = '../html/signin.html'; 
      })
      .catch(error => {
          msgError.innerHTML = `<strong>${error.message}</strong>`;
      });
  });
});
