document.addEventListener('DOMContentLoaded', function() {
    const addServiceBtn = document.getElementById('add-service-btn');
    const cancelServiceBtn = document.getElementById('cancel-service-btn');
    const serviceForm = document.getElementById('service-form');
    const serviceFormElement = document.getElementById('service-form-element');
    const serviceListUl = document.getElementById('service-list-ul');
    let isEditing = false;
    let currentServiceItem = null;

    const addBarberBtn = document.getElementById('add-barber-btn');
    const cancelBarberBtn = document.getElementById('cancel-barber-btn');
    const barberForm = document.getElementById('barber-form');
    const barberFormElement = document.getElementById('barber-form-element');
    const barberListUl = document.getElementById('barber-list-ul');

    // Função para carregar todos os serviços ao carregar a página
    function loadServices() {
        fetch('http://localhost:3000/services')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar serviços');
                }
                return response.json();
            })
            .then(data => {
                // Limpa a lista de serviços
                serviceListUl.innerHTML = '';

                // Adiciona os serviços à lista
                data.forEach(service => {
                    const serviceItem = createServiceItem(service);
                    serviceListUl.appendChild(serviceItem);
                });
            })
            .catch(error => console.error(error));
    }

    // Função para carregar todos os barbeiros ao carregar a página
function loadBarbers() {
    fetch('http://localhost:3000/barbers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar barbeiros');
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos dos barbeiros:", data); // Adicionando esta linha para depuração

            // Limpa a lista de barbeiros
            barberListUl.innerHTML = '';

            // Adiciona os barbeiros à lista
            data.forEach(barber => {
                const barberItem = createBarberItem(barber);
                barberListUl.appendChild(barberItem);
            });
        })
        .catch(error => console.error(error));
}


    // Função para criar um item de serviço na lista
    function createServiceItem(service) {
        const serviceItem = document.createElement('li');
        serviceItem.id = `service-${service.id}`;
        
        // Verifica se os campos do serviço estão definidos
        const serviceName = service.service_name ? service.service_name : 'Nome do serviço indisponível';
        const serviceDescription = service.description ? service.description : 'Descrição indisponível';
        const servicePrice = service.value ? `R$${service.value.toFixed(2)}` : 'Preço indisponível';
        
        serviceItem.innerHTML = `
            <span class="service-name">${serviceName}</span> - 
            <span class="service-description">${serviceDescription}</span> - 
            <span class="service-price">${servicePrice}</span>
            <button class="edit-service-btn">Editar</button>
            <button class="delete-service-btn">Excluir</button>
        `;
    
        // Adiciona os event listeners para os botões de editar e excluir
        serviceItem.querySelector('.edit-service-btn').addEventListener('click', function() {
            editService(service);
        });
    
        serviceItem.querySelector('.delete-service-btn').addEventListener('click', function() {
            deleteService(service);
        });
    
        return serviceItem;
    }

    // Função para criar um item de barbeiro na lista
    function createBarberItem(barber) {
    

    const barberItem = document.createElement('li');
    barberItem.id = `barber-${barber.id}`;
    barberItem.innerHTML = `
        <span class="barber-name">${barber.nome}</span>
        <button class="delete-barber-btn">Excluir</button>
    `;

    // Adiciona o event listener para o botão de excluir
    barberItem.querySelector('.delete-barber-btn').addEventListener('click', function() {
        deleteBarber(barber);
    });

    return barberItem;
}


    // Função para adicionar um novo serviço à lista
    function addServiceToList(service) {
        const serviceItem = createServiceItem(service);
        serviceListUl.appendChild(serviceItem);
        location.reload()
    }

    // Função para adicionar um novo barbeiro à lista
    function addBarberToList(barber) {
        const barberItem = createBarberItem(barber);
        barberListUl.appendChild(barberItem);
        location.reload()
    }

    // Função para editar um serviço
    function editService(service) {
        isEditing = true;
        currentServiceItem = service;
        serviceForm.style.display = 'block';
        serviceForm.querySelector('h3').textContent = 'Editar Serviço';
        serviceFormElement.querySelector('button[type="submit"]').textContent = 'Salvar';
        document.getElementById('service-name').value = service.service_name;
        document.getElementById('service-description').value = service.description;
        document.getElementById('service-price').value = service.value;
        
    }

    // Função para excluir um serviço
    function deleteService(service) {
        const confirmation = confirm(`Tem certeza que deseja excluir o serviço "${service.service_name}"?`);
        if (confirmation) {
            fetch(`http://localhost:3000/services/${service.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir serviço');
                }
                return response.json();
            })
            .then(() => {
                const serviceItem = document.getElementById(`service-${service.id}`);
                if (serviceItem) {
                    serviceItem.remove();
                }
            })
            .catch(error => console.error(error));
        }
    }

  // Função para excluir um barbeiro
function deleteBarber(barber) {
    const confirmation = confirm(`Tem certeza que deseja excluir o barbeiro com ID ${barber.id}?`);
    if (confirmation) {
        fetch(`http://localhost:3000/barbers/${barber.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir barbeiro');
            }
            return response.json();
        })
        .then(() => {
            const barberItem = document.getElementById(`barber-${barber.id}`);
            if (barberItem) {
                barberItem.remove();
            }
        })
        .catch(error => console.error(error));
    }
}


    // Carrega os serviços e barbeiros ao carregar a página
    loadServices();
    loadBarbers();

    addServiceBtn.addEventListener('click', function() {
        serviceForm.style.display = 'block';
        serviceFormElement.reset();
        isEditing = false;
        currentServiceItem = null;
        serviceForm.querySelector('h3').textContent = 'Adicionar Serviço';
        serviceFormElement.querySelector('button[type="submit"]').textContent = 'Adicionar';
    });

    cancelServiceBtn.addEventListener('click', function() {
        serviceForm.style.display = 'none';
    });

    serviceFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const serviceName = document.getElementById('service-name').value
        const serviceDescription = document.getElementById('service-description').value;
        const servicePrice = parseFloat(document.getElementById('service-price').value);

        if (isEditing && currentServiceItem) {
            // Editar o serviço existente
            fetch(`http://localhost:3000/services/${currentServiceItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_name: serviceName,
                    description: serviceDescription,
                    value: servicePrice
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao editar serviço');
                }
                return response.json();
            })
            .then(data => {
                const serviceItem = document.getElementById(`service-${currentServiceItem.id}`);
                if (serviceItem) {
                    serviceItem.querySelector('.service-name').textContent = serviceName;
                    serviceItem.querySelector('.service-price').textContent = `R$${servicePrice.toFixed(2)}`;
                }
                serviceFormElement.reset();
                serviceForm.style.display = 'none';
                isEditing = false;
                currentServiceItem = null;
                location.reload();
            })
            .catch(error => console.error(error));
        } else {
            // Adicionar um novo serviço
            fetch('http://localhost:3000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_name: serviceName,
                    description: serviceDescription,
                    value: servicePrice
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar serviço');
                }
                return response.json();
            })
            .then(data => {
                addServiceToList(data); // Adiciona o novo serviço à lista de serviços existentes
                // Limpa o formulário e esconde o formulário de adição
                serviceFormElement.reset();
                serviceForm.style.display = 'none';
            })
            .catch(error => console.error(error));
        }
    });

    addBarberBtn.addEventListener('click', function() {
        barberForm.style.display = 'block';
        barberFormElement.reset();
    });

    cancelBarberBtn.addEventListener('click', function() {
        barberForm.style.display = 'none';
    });

    barberFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const barberName = document.getElementById('barber-name').value;

        fetch('http://localhost:3000/barbers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barber_name: barberName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar barbeiro');
            }
            return response.json();
        })
        .then(data => {
            addBarberToList(data); // Adiciona o novo barbeiro à lista de barbeiros existentes
            // Limpa o formulário e esconde o formulário de adição
            barberFormElement.reset();
            barberForm.style.display = 'none';
        })
        .catch(error => console.error(error));
    });
});




