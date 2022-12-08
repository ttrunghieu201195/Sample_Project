var objGenericDrug={};
const fs = require('fs');
fs.readFile('./sample_tthc.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const databases = JSON.parse(data);
        databases.forEach(element => {
            drugInteract_1=element.HOAT_CHAT_1;
            drugInteract_2=element.HOAT_CHAT_2;
            console.log(drugInteract_1 , drugInteract_2);
            if(drugInteract_1 in objGenericDrug){
                objGenericDrug[drugInteract_1].push(drugInteract_2);
            }
            else{
                objGenericDrug[drugInteract_1]=[drugInteract_2];
            }
            //console.log(objGenericDrug);
        });
    }
    console.log(objGenericDrug);
});