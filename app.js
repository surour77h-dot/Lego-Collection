fetch('data.json')
.then(r=>r.json())
.then(data=>{

const table=document.getElementById('dataTable');

if(!data.length) return;

const keys=Object.keys(data[0]);

table.innerHTML='';

let html='<thead><tr>';

keys.forEach(k=>{
html+=`<th>${k}</th>`;
});

html+='</tr></thead><tbody>';

data.forEach(row=>{

html+='<tr>';

keys.forEach(k=>{

let v=row[k] ?? '';

html+=`<td>${v}</td>`;

});

html+='</tr>';

});

html+='</tbody>';

table.innerHTML=html;

})
.catch(err=>{
document.body.innerHTML=
'<h1 style="padding:40px">APP ERROR</h1>';
console.error(err);
});
