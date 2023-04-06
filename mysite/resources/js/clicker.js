
let pos = [];
// const url = 'http://localhost:8080/api/clicker'; // не получилось отправить запрос так видимо порты не настроены не стал колупаться.
const url = 'api/clicker';
let arData;


document.body.onclick = function(e) {
  
    var today = new Date();
    var hour = today.getHours()+':'+today.getMinutes();
    var date = today.getFullYear()+'/'+(Number(today.getMonth())+1)+'/'+today.getDate();
    
    pos.push({
        'posX':event.clientX,
        'posY':event.clientY,
        'date':date,
        'hour':hour,
        'url':window.location.host,
    });
}

window.onbeforeunload = function (event) {

    if(pos.length){

        $.ajax({
            url: url,
            type:"POST",
            data:{
                "data":pos,
            },
            success:function(data){
                console.log(data);
            },
        });
    }

}