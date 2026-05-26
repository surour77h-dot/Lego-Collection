fetch('data.json')
.then(r=>r.json())
.then(data=>{

const table=document.getElementById('dataTable');
const rows=data.sheets.Owned.rows;

if(!rows.length) return;

const keys=Object.keys(rows[0]);

let html='<thead><tr>';

keys.forEach(k=>{
html+=`<th>${k}</th>`;
});

html+='</tr></thead><tbody>';

rows.forEach(row=>{
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
document.body.innerHTML='<h1 style="padding:40px;color:red">APP ERROR</h1><pre>'+err+'</pre>';
});
