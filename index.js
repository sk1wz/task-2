const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://api.kanye.rest/';
const nameDirectory = 'phrases'; // Тут пишите имя директории в которой нужно создавать файлы
const TOTAL_FOLDER = 10; // Количество подкаталогов
const TOTAL_IN_FOLDER = 10; // Количество записей в подкоталоге


// Функция запроса.
async function fetching(){
    try {
        const response = await fetch(BASE_URL);
        return response.json();
    } catch (error) {
        return console.error(error);
    }
}

// Создание структуры + запись данных
async function CreateStruct(){
    const currentDirectory = path.join(process.cwd(), nameDirectory);
    // process.cwd() = где находится скрипт берем эту директорию.

    if (!fs.existsSync(currentDirectory)) {
        fs.mkdirSync(currentDirectory);
    }
    
    for(let i = 0; i < TOTAL_FOLDER; i++){
        const folderPathCreate = path.join(phrasesDir, `folder_${i+1}`);
        fs.mkdirSync(folderPathCreate);
        const allData = [];
        for(let j = 0; j < TOTAL_IN_FOLDER; j++){
            const data = await fetching();
            if(data){
                allData.push(data);
            }
        }

        const filePath = path.join(folderPathCreate, 'index.json');
        fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
    }
}

// Функция для старта скрипта.
async function mainStart(){
    await CreateStruct();
    console.log('Script Done!');
    
}

mainStart();