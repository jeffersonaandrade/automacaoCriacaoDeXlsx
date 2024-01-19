const XLSX = require('xlsx');


const url = 'https://randomuser.me/api/?results=200&nat=BR,GB,NZ,FR,DK,US&inc=name,phone';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const users =data.results.map(user =>{
            const firstName = user.name.first;
            const lastName = user.name.last;
            const externalKeyAccount = `${(Math.floor(Math.random() * 100000)).toString().padStart(5, '0')}`;
            const phoneNumber = user.phone.replace(/\D/g, '');
            const action = 'Insert';
            return {NomeCompleto: `${firstName} ${lastName}`, 'EXTERNAL KEY ACCOUNT' : externalKeyAccount, 'TelefoneCelular': phoneNumber, 'Action': action};
        });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(users);
        XLSX.utils.book_append_sheet(wb,ws, 'Planilha');
        
        XLSX.writeFile(wb, 'dados.xlsx');
    })
    .catch(error => {
        console.log('Erro: ', error);
    });


