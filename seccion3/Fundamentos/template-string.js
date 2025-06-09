
const nombre = 'Deadpool';
const real = 'Wade Winston';

const normal = nombre +' '+ real;
const template = `Leivy Candelaria`;
const template2 = `${1+1} ${real}`;
const template3=`${nombre} ${real}`;

console.log(normal);
console.log(template);
console.log(template2);
console.log(normal === template3);

const html = `

<h1>Hola</h1>
<p>Hola, ${nombre}</p>  `;
console.log(html);