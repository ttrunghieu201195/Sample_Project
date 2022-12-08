// const kvArray1 = [
//     { key: 'Acid tranexamic', value: ['Ethinyl estradiol','Estradiol valerat','Estriol']},
//     { key: 'Acenocoumarol', value: ['Tamoxifen'] }
//   ];
const objGenericDrug = {
    'Acid tranexamic': ['Ethinyl estradiol','Estradiol valerat','Estriol'],
    'Acenocoumarol':  ['Tamoxifen',"Aciclovir","lopinavir","ritonavir","Metformin"]
};
// var objGenericDrug={};
// const fs = require('fs');
// fs.readFile('./sample_tthc.json', 'utf8', (err, data) => {

//     if (err) {
//         console.log(`Error reading file from disk: ${err}`);
//     } else {
//         const databases = JSON.parse(data);
//         databases.forEach(element => {
//             drugInteract_1=element.HOAT_CHAT_1;
//             drugInteract_2=element.HOAT_CHAT_2;
//             console.log(drugInteract_1 , drugInteract_2);
//             if(drugInteract_1 in objGenericDrug){
//                 objGenericDrug[drugInteract_1].push(drugInteract_2);
//             }
//             else{
//                 objGenericDrug[drugInteract_1]=[drugInteract_2];
//             }
//             //console.log(objGenericDrug);
//         });
//     }
//     console.log(objGenericDrug);
// });

var tbl = document.getElementById('list_thuocbhyt');
var arrMedicine=[];

function initArrMedicine(){
        arrMedicine=[];
        $('#list_thuocbhyt >tbody > tr').each((i,e)=>{
            $(e).find('td').each((ii,ee)=>{if($(ee).attr('aria-describedby')=='list_thuocbhyt_HOAT_CHAT'){
                    console.log(ee.textContent);
                    addMedicine(ee.textContent);         
                
                }})  
            })
};

$('#sua').on("click",function() {
    initArrMedicine();
});

function sliceStr(str){
    var result=[];
    if(str.indexOf("+")){
       arrSplit= str.split("+");
       arrSplit.forEach(element => {
            if(element.indexOf("/")){
                element.split("/").forEach(ee=>{
                    result.push(ee);
                });
            }
            else{
                result.push(element);
            }
       });
    }
    // xử lý TH có dấu gạch ở giữa lopinavir/ritonavir
    else if(str.indexOf("/")){
        arrSplit= str.split("/");
        arrSplit.forEach(element => {
            result.push(element.trim());
        });
    }
    return result;
}

function checkInteract(generic_drug){
    console.log(generic_drug);
    if(generic_drug in objGenericDrug){
        console.log(objGenericDrug[generic_drug]);
        const resultCompareArr = objGenericDrug[generic_drug].filter(value =>arrMedicine.includes(value));
        if(resultCompareArr){
            console.log(82,resultCompareArr)
            return resultCompareArr;
        }
    }
    return false;
}

function show_warning(generic_drug_1,generic_drug_2){
    alert(generic_drug_1 + " tương tác với " +generic_drug_2);
}

function addMedicine(medicine){
    //console.log(medicine);
    var arrSliceStr = sliceStr(medicine);
    //check table empty insert arr
    if(tbl.rows.length==1){
        for (let index = 0; index < arrSliceStr.length; index++) {
            console.log(30,arrSliceStr[index].trim());
            arrMedicine.push(arrSliceStr[index].trim());
        }
    }
    else{
        for (let index = 0; index < arrSliceStr.length; index++) {
            if(!arrMedicine.includes(arrSliceStr[index].trim())){
                var medicine_generic_drug=checkInteract(arrSliceStr[index].trim());
                if(medicine_generic_drug){
                    console.log(109,medicine_generic_drug);
                    show_warning(arrSliceStr[index].trim(),medicine_generic_drug);
                }
                else{
                    console.log(113,medicine_generic_drug);
                    arrMedicine.push(arrSliceStr[index].trim());
                }
            }
        }
    }
    //console.log(14,arrSliceStr);
}
var pos=0;
$("#tenthuongmai").on("keypress", function(event) {
    if (event.key === "Enter") {     
           // console.log($("#tengoc").val());
            addMedicine($("#tengoc").val());
    }
});