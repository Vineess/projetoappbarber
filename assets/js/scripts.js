
// Função para carregar os serviços disponíveis
function loadServices() {
    fetch('http://localhost:3000/services')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar serviços');
            }
            return response.json();
        })
        .then(data => {
            const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.innerHTML = ''; // Limpa as opções existentes

            // Adiciona a opção padrão "Selecione um Serviço"
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Selecione um Serviço';
            serviceSelect.appendChild(defaultOption);

            // Adiciona os serviços à lista
            data.forEach(service => {
                const option = document.createElement('option');
                option.value = service.service_name;
                option.textContent = service.service_name;
                serviceSelect.appendChild(option);
            });
        }})
        .catch(error => console.error(error));
}

// Função para carregar os barbeiros disponíveis
function loadBarbers() {
    fetch('http://localhost:3000/barbers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar barbeiros');
            }
            return response.json();
        })
        .then(data => {
            const barberSelect = document.getElementById('barber');
if (barberSelect) {
    barberSelect.innerHTML = ''; // Limpa as opções existentes

            // Adiciona a opção padrão "Selecione um Barbeiro"
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Selecione um Barbeiro';
            barberSelect.appendChild(defaultOption);

            // Adiciona os barbeiros à lista
            data.forEach(barber => {
                const option = document.createElement('option');
                option.value = barber.nome;
                option.textContent = barber.nome;
                barberSelect.appendChild(option);
            });
        }})
        .catch(error => console.error(error));
}

function sendFormDataToServer(nome_cliente, data_agendamento, horario_agendamento, nome_servico, barber, email_cliente) {
    

    fetch('http://localhost:3000/agendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_cliente: nome_cliente,
            data_agendamento: data_agendamento,
            horario_agendamento: horario_agendamento,
            nome_servico: nome_servico,
            barber: barber,
            email_cliente: email_cliente,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados do agendamento');
        }
        return response.json();
    })
    .then(data => {
        // Exibe a confirmação e redireciona para a página principal
        alert(data.message);
        window.location.href = 'index.html'; // Redireciona para a página principal
    })
    .catch(error => console.error(error));
}


// Função para carregar os serviços e barbeiros ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadBarbers();

    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const telefone = localStorage.getItem('telefone');
    const email = localStorage.getItem('email');

    if (token && userName && telefone) {
        // Preenche os campos de nome e telefone com os dados do usuário
        const nameField = document.getElementById('name');
        const phoneField = document.getElementById('phone');
        const emailField = document.getElementById('email');

    

        nameField.value = userName;
        phoneField.value = telefone;
        emailField.value  = email;

        // Bloqueia os campos de nome e telefone para edição
        nameField.setAttribute('readonly', true);
        phoneField.setAttribute('readonly', true);
        emailField.setAttribute('readonly', true);
    }

    // Adiciona o ouvinte de evento ao formulário de agendamento
    const bookingForm = document.querySelector('.booking-form form');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio automático do formulário

        const nome_servico = document.getElementById('service').value;
        const barber = document.getElementById('barber').value;
        const data_agendamento = document.getElementById('date').value;
        const horario_agendamento = document.getElementById('time').value;
        const nome_cliente = document.getElementById('name').value;
        const email_cliente = document.getElementById('email').value;

        // Exibe a mensagem de confirmação
        const confirmBooking = confirm('Você realmente deseja confirmar o agendamento?');
        if (confirmBooking) {
            // Envia os dados do formulário para o servidor
            sendFormDataToServer(nome_cliente, data_agendamento, horario_agendamento, nome_servico, barber, email_cliente);
        }
    });

});



