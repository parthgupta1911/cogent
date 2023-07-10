const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const link=urlParams.get('link')
//console.log(link);
//https://jsonplaceholder.typicode.com/posts
//get the 1 st element of the array using its keys decide the table headings 
//if link wrap in a tag
   //then check if its an image link then put it in img tag

   const isUrl = urlString =>{
    var a  = document.createElement('a');
   	a.href = urlString;
   	return (a.host && a.host != window.location.host);
  } 
//console.log(isURL('https:\/\/images.dog.ceo\/breeds\/puggle\/IMG_144409.jpg'));  
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
//console.log(isImage('https:\/\/images.dog.ceo\/breeds\/puggle\/IMG_144409.jpg'));  
fetch(link)
            .then(data=>{//console.log(data); json to object
            return data.json();//this is passsed to the next .then method
        }).then(objdata=>{
            const keys=Object.keys(objdata[0]);
            let th="";
            keys.map(el=>{th+=`<th scope="col">${el}</th>
            `})
            document.getElementById('table-head').innerHTML=th;



            let td="";
            objdata.map(obj=>{
             td+=` <tr>
             ${Object.values(obj).map((el,i)=>{if(isUrl(el)){if(isImage(el)){return `<td><img src="${el}" height="100"/></td>`}return `<td><a href="${el}">${el}</a></td>` }if(i==0){return `<th>${JSON.stringify(el)}</th>`} return`<td>${JSON.stringify(el)}</td>`}).join(' ')}
           </tr>`;
            })
            document.getElementById('table-bod').innerHTML=td
            document.getElementsByClassName("loading")[0].style.display = "none";
            document.getElementById('table').style.display=""

        }).catch(err=>{
          document.getElementById("error").style.display = "";

          document.getElementsByClassName("loading")[0].style.display = "none";

        })
    