let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]
// function jsUcfirst(string) 
// {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }
function sliceStr(str){
    var result=[];
    if(str.indexOf("/")){
        arrSplit= str.split("/");
        arrSplit.forEach(element => {
            result.push(element);
        });
    }
    return result;
}
var arrInteract={};
document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              rowObject.forEach(element=>{
                // console.log(element.HOAT_CHAT_1, element.HOAT_CHAT_2);
                var arrSliceStr1;
                var arrSliceStr2;
                //TH1: a
                if(element.HOAT_CHAT_1.indexOf("/")==-1){
                    //TH: Alfuzosin  	Atazanavir/ritonavir
                    //TH này là khi có hoạt chất 1 ở trong key rồi thì ra sẽ chia 2 TH ở value là có dấu / và không có dấu /
                    // Ở đây đã có sẵn chất 1 trong key rồi nên nếu có / ta chỉ cần tách rồi push từng cái vô
                    if(arrInteract.hasOwnProperty(element.HOAT_CHAT_1)){
                        if(element.HOAT_CHAT_2.indexOf("/")!=-1){
                            arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
                            arrSliceStr2.forEach(ee2=>{
                                arrInteract[element.HOAT_CHAT_1].push(ee2);
                                if(arrInteract.hasOwnProperty(ee2)){
                                    arrInteract[ee2].push(element.HOAT_CHAT_1);
                                }else{
                                    arrInteract[ee2]=[element.HOAT_CHAT_1];
                                }
                            });
                        }
                        //TH a   b
                        else{
                            arrInteract[element.HOAT_CHAT_1].push(element.HOAT_CHAT_2);
                            if(arrInteract.hasOwnProperty(element.HOAT_CHAT_2)){
                                arrInteract[element.HOAT_CHAT_2].push(element.HOAT_CHAT_1);
                            }else{
                                arrInteract[element.HOAT_CHAT_2]=[element.HOAT_CHAT_1];
                            }
                        }
                    }
                    else{
                        arrInteract[element.HOAT_CHAT_1]=[];
                        if(element.HOAT_CHAT_2.indexOf("/")){
                            arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
                            arrSliceStr2.forEach(ee2=>{
                                arrInteract[element.HOAT_CHAT_1].push(ee2);
                                if(arrInteract.hasOwnProperty(ee2)){
                                    arrInteract[ee2].push(element.HOAT_CHAT_1);
                                }else{
                                    arrInteract[ee2]=[element.HOAT_CHAT_1];
                                }
                            });
                        }
                        //TH a   b
                        else{
                            arrInteract[element.HOAT_CHAT_1].push(element.HOAT_CHAT_2);
                            if(arrInteract.hasOwnProperty(element.HOAT_CHAT_2)){
                                arrInteract[element.HOAT_CHAT_2].push(element.HOAT_CHAT_1);
                            }else{
                                arrInteract[element.HOAT_CHAT_2]=[element.HOAT_CHAT_1];
                            }
                        }
                    }
                }
                else{
                    //TH: a/b    c/d
                    arrSliceStr1 = sliceStr(element.HOAT_CHAT_1);
                    arrSliceStr1.forEach(ee1=>{
                        if(element.HOAT_CHAT_2.indexOf("/")!=-1){
                            arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
                            arrSliceStr2.forEach(ee2=>{
                                if(arrInteract.hasOwnProperty(ee1)){
                                    arrInteract[ee1].push(ee2);
                                }if(!arrInteract.hasOwnProperty(ee1)){
                                    arrInteract[ee1]=[ee2];
                                }
                                if(arrInteract.hasOwnProperty(ee2)){
                                    arrInteract[ee2].push(ee1);
                                }
                                else{
                                    arrInteract[ee2]=[ee1];
                                }
                            });
                        }
                        else{
                            if(arrInteract.hasOwnProperty(element.HOAT_CHAT_2)){
                                arrInteract[element.HOAT_CHAT_2].push(ee1);
                            }
                            if(!arrInteract.hasOwnProperty(element.HOAT_CHAT_2)){
                                arrInteract[element.HOAT_CHAT_2]=[ee1];
                            }
                            if(arrInteract.hasOwnProperty(ee1)){
                                arrInteract[ee1].push(element.HOAT_CHAT_2);
                            }else{
                                arrInteract[ee1]=[element.HOAT_CHAT_2];
                            }
                        }
                        
                    });
                
                }
                    
            //         //TH chưa có hoạt chất 1 trong mảng nên phải tạo key rồi insert hoạt chất đó vào value
            //         //==> Ở đây có 2 TH là nếu hoạt chất 2 có / và không có /
            //         else{
            //             if(element.HOAT_CHAT_2.indexOf("/")){
            //                 arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
            //                 arrInteract[element.HOAT_CHAT_1]=[];
            //                 arrSliceStr2.forEach(ee2=>{
            //                     arrInteract[element.HOAT_CHAT_1].push(ee2);
            //                 });
            //             }else{
            //                 arrInteract[element.HOAT_CHAT_1]=[element.HOAT_CHAT_2];
            //             }
            //         }
            //         //========================================================================
            //         if(element.HOAT_CHAT_2.indexOf("/")){
            //             arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
            //             arrSliceStr2.forEach(ee2=>{
            //                 if(arrInteract.hasOwnProperty(ee2)){
            //                     arrInteract[ee2].push(element.HOAT_CHAT_1);
            //                 }
            //                 else{
            //                     arrInteract[ee2]=[element.HOAT_CHAT_1]
            //                 }
            //             });
            //         }
            //         //TH: a b
            //         else{
            //             arrInteract[element.HOAT_CHAT_1].push(element.HOAT_CHAT_1);
            //         }
            //     }

            //     if(element.HOAT_CHAT_1.indexOf("/")){
            //         arrSliceStr1 = sliceStr(element.HOAT_CHAT_1);
            //         arrSliceStr1.forEach(ee1=>{
            //             if(arrInteract.hasOwnProperty(ee1)){
            //                 arrInteract[ee1].push(element.HOAT_CHAT_2);
            //             }
            //             else{
            //                 arrInteract[ee1]=[element.HOAT_CHAT_2]
            //             }
            //         });
            //     }
            //     if(element.HOAT_CHAT_2.indexOf("/")){
            //         arrSliceStr2 = sliceStr(element.HOAT_CHAT_2);
            //         arrSliceStr2.forEach(ee2=>{
            //             if(arrInteract.hasOwnProperty(ee2)){
            //                 arrInteract[ee2].push(element.HOAT_CHAT_1);
            //             }
            //             else{
            //                 arrInteract[ee2]=[element.HOAT_CHAT_1]
            //             }
            //         });
            //     }

        });
            // console.log(arrInteract);
            var result = handleDuplicateValue(arrInteract)
            document.getElementById("jsondata").innerHTML = JSON.stringify(result,undefined,4);
         });
        }
    }
});
//
var objInteractHandled={};
function handleDuplicateValue(obj) {
    // console.log(obj);
    Object.keys(obj).forEach(element=>{
        var arrValue=obj[element];
        element=element.toLowerCase();
        // objInteractHandled[element]
        // console.log(arrInteract[element]);
        arrValue.forEach(eValue=>{
            if(objInteractHandled.hasOwnProperty(element)){
                if(!objInteractHandled[element].includes(eValue.toLowerCase())){
                    objInteractHandled[element].push(eValue.toLowerCase());
                }
            }
            else{
                objInteractHandled[element]=[eValue.toLowerCase()];
            }
        });
    });
    return objInteractHandled;
}