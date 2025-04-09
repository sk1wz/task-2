const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://api.kanye.rest/';
const directoryName = 'phrases'; // Тут пишите имя директории в которой нужно создавать файлы
const TOTAL_FOLDER = 10; // Количество подкаталогов
const TOTAL_IN_FOLDER = 10; // Количество записей в подкоталоге


// Функция запроса.
async function fetchPhrases(){
    try {
        const response = await fetch(BASE_URL);
        return response.json();
    } catch (error) {
        return console.error(error);
    }
}


async function writePhrases(){
    const currentDirectory = path.join(process.cwd(), directoryName);
    // process.cwd() = где находится скрипт берем эту директорию.

    if (!fs.existsSync(currentDirectory)) {
        fs.mkdirSync(currentDirectory);
    }
    
    for(let i = 0; i < TOTAL_FOLDER; i++){
        const folderPath = path.join(currentDirectory, `folder_${i+1}`);
        fs.mkdirSync(folderPath);
        const phrases = [];
        for(let j = 0; j < TOTAL_IN_FOLDER; j++){
            const phrase = await fetchPhrases();
            if(phrase){
                phrases.push(phrase.quote);
            }
        }

        const filePath = path.join(folderPath, 'index.json');
        fs.writeFileSync(filePath, JSON.stringify(phrases, null, 2));
    }
}


// Запуск скрипта
(async() =>{
    await writePhrases();
    console.log('Script Done!');
})()

