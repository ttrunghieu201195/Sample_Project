console.log("First log from Hieu's extension");

var tenthuongmaiEle = $("#tenthuongmai");

//$('#list_thuocbhyt >tbody >tr[id="1"] >td[aria-describedby="list_thuocbhyt_TEN_VAT_TU"]').text()



$("#tenthuongmai").on("keypress", function(event) {
    if (event.key === "Enter") {
        $('#list_thuocbhyt >tbody > tr').each((i,e)=>{
            $(e).find('td').each((ii,ee)=>{if($(ee).attr('aria-describedby')=='list_thuocbhyt_HOAT_CHAT'){
                if($("#tengoc").val().length > 0 && $("#tengoc").val().indexOf(ee.textContent)){
                    console.log(ee.textContent);
                    //alert("Trung hoat chat!!!");
                }
                
            }})  
        })


    }
});