document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Verifica se há um token armazenado

    const loggedInContent = document.getElementById('logged-in-content');
    const loggedOutContent = document.getElementById('logged-out-content');

    if (loggedInContent && loggedOutContent) {
        if (token) {
            loggedInContent.style.display = 'block';
            loggedOutContent.style.display = 'none';
        } else {
            loggedInContent.style.display = 'none';
            loggedOutContent.style.display = 'block';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Verifica se há um token armazenado
    const userName = localStorage.getItem('userName'); // Obtém o nome do usuário, se estiver disponível no armazenamento local
    const email = localStorage.getItem('email'); // Obtém o email do usuário
    const telefone = localStorage.getItem('telefone'); // Obtém o telefone do usuário

    const signInLink = document.getElementById('signin');
    const signUpLink = document.getElementById('signup');
    const userInfo = document.getElementById('user-info');
    const signOutLink = document.getElementById('signout');
    const profileInfo = document.querySelector('.profile-info .info');

    if (token) {
        signInLink.style.display = 'none';
        signUpLink.style.display = 'none';
        userInfo.textContent = `Olá, ${userName}`;
        userInfo.style.display = 'block';
        signOutLink.style.display = 'block';

        if (profileInfo) {
            profileInfo.innerHTML = `
                <p><strong>Nome:</strong> ${userName}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
            `;
        }
    } else {
        signInLink.style.display = 'block';
        signUpLink.style.display = 'block';
        userInfo.style.display = 'none';
        signOutLink.style.display = 'none';
    }
});

function logout() {
    // limpa o localStorage por completo 
    localStorage.clear();
    

    // Redirecionamento para a página de login
    window.location.href = "index.html";
}

// Função para carregar os agendamentos futuros do usuário
function loadFutureAppointments() {
    const userEmail = localStorage.getItem('email');

    if (!userEmail) {
        console.error('Email do usuário não encontrado no LocalStorage');
        return;
    }

    fetch(`http://localhost:3000/future-appointments`, {
        headers: {
            'Content-Type': 'application/json',
            'user-email': userEmail
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar agendamentos futuros');
        }
        return response.json();
    })
    .then(data => {
        const futureAppointmentsList = document.getElementById('future-appointments-modal');
        if (!futureAppointmentsList) {
            throw new Error('Elemento future-appointments-modal não encontrado');
        }
        futureAppointmentsList.innerHTML = '';
    
        data.forEach(appointment => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <p><strong>Data:</strong> ${new Date(appointment.data_agendamento).toLocaleDateString()}</p>
                <p><strong>Horário:</strong> ${appointment.horario_agendamento}</p>
                <p><strong>Serviço:</strong> ${appointment.nome_servico}</p>
                <p><strong>Barbeiro:</strong> ${appointment.barber}</p>
                <p style="color: orange;"><strong>Aguardando aprovação</strong></p>
            `;
            futureAppointmentsList.appendChild(listItem);
        });
    
        // Mostra o modal após carregar os agendamentos
        openModal();
    })
    .catch(error => console.error(error));
}

// Função para abrir o modal
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Verifica se estamos na página de perfil antes de carregar os agendamentos futuros
document.addEventListener('DOMContentLoaded', function() {
    const verAgendamentosBtn = document.getElementById('ver-agendamentos-btn');

    if (verAgendamentosBtn) {
        verAgendamentosBtn.addEventListener('click', loadFutureAppointments);
    }

    if (document.getElementById('logged-in-content')) {
        //
    }
});


