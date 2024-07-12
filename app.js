const puppeteer = require('puppeteer');

(async () => {
    var telefones = ['5551994515286', '5551993556234', '5562986246249','5521 999276614'];
    var mensagem = 'Olá, test bot ---- mensagem em massa! --- Aqui eh o Rafa Back End testando de um numero alternativo';
    
    // Especificando o diretório para armazenar dados do usuário
    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './user_data'
    });
    const pagina = await navegador.newPage();

    // Lidar com diálogos que perguntam se você deseja sair da página
    pagina.on('dialog', async dialog => {
        await dialog.accept();
    });

    await pagina.goto('https://web.whatsapp.com/send?phone=+' + telefones[0] + '&text=' + mensagem);
    await delay(10000);
    console.log('Conectado');
    console.log('Enviando mensagem');
    await pagina.click("span[data-icon='send']");
    await delay(10000);

    for (var indice = 1; indice < telefones.length; indice++) {
        await pagina.goto('https://web.whatsapp.com/send?phone=+' + telefones[indice] + '&text=' + mensagem);
        await delay(10000);
        await pagina.click("span[data-icon='send']");
        console.log('Enviando mensagem para', telefones[indice]);
        await delay(20000);
    }
})();

function delay(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t);
    });
}

