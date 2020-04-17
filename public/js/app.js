//client-side javascript
console.log('client side js started');
/* fetch(`http://localhost:2000/weather?address=${queryAddress}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast);
            console.log(data.address);
        }
    })
}); */

const weatherForm = document.querySelector('form');
const queryAddress = document.querySelector('input');
const message1 = document.querySelector('#msg-1');
const message2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = queryAddress.value;
    message1.textContent = "Loading....";
    message2.textContent = "";
    fetch(`http://localhost:2000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.msg;
            }else{
                message1.textContent = data.location;
                message2.textContent = data.forecast;
                
            }
        });
    });
});

