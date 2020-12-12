const fetch = require('node-fetch');
fetch("https://quotes.rest/qod",{'Accept':'application/json'}).then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data.contents.quotes[0].quote);
});