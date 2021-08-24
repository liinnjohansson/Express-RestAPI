window.addEventListener('load', main);

function main(){
    fetchShoes();
}

async function fetchShoes(){
    const response = await fetch('/api/shoes');
    const result = await response.json();
    let container = document.querySelector('.shoes');
    console.log(container);
    container.innerHTML = JSON.stringify(result, null, 4);
}