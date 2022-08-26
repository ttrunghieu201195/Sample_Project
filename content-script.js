console.log("First log from Hieu's extension");

var tenthuongmaiEle = $("#tenthuongmai");

$("#tenthuongmai").on("keypress", function(event) {
    if (event.key === "Enter") {
        if ($("#tengoc").val().length > 0 && $("#tengoc").val().indexOf("Paracetamol") >= 0) {
            alert("Trung hoat chat!!!");
        }
    }
});