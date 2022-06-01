const d = document; 

const $form = d.getElementById('form');
const $btnCalc = d.getElementById('btnCalc');
const $addPoint = d.getElementById('addPoint');
const ctx = document.getElementById('myChart').getContext('2d');

// [ [ x , y , x^2 , y^2 , xy ] ]
let matriz = []
// [ [ x , curvaAjusteLineal ] ]
let curvaAjusteLineal = []

$btnCalc.addEventListener('click',()=> {
    matriz = [];
    const $inputsX = [].slice.call($form.querySelectorAll('.input-x'))
    const $inputsY = [].slice.call($form.querySelectorAll('.input-y'))

    for (const index in $inputsX) {
        const x = $inputsX[index].value;
        const y = $inputsY[index].value
        matriz.push([Number(x),Number(y),Number(x*x),Number(y*y),Number(x*y)])
    }
    console.table(matriz);
    calcCurvaAjusteLineal();
})

const calcCurvaAjusteLineal = () => {
    let  sumaX = 0, sumaY = 0, sumaXX = 0, sumaYY = 0, sumaXY = 0
    matriz.map(dato => sumaX += Number(dato[0]) );
    matriz.map(dato => sumaY += Number(dato[1]) );
    matriz.map(dato => sumaXX += Number(dato[2]) );
    matriz.map(dato => sumaYY += Number(dato[3]) );
    matriz.map(dato => sumaXY += Number(dato[4]) );

    const a = ((matriz.length * sumaXY) - (sumaX * sumaY)) / ((matriz.length * sumaXX) - (sumaX * sumaX) );
    const b = ((sumaY) - (a * sumaX )) / matriz.length
    const coeficienteCorreccion =  ((matriz.length * sumaXY) - (sumaX * sumaY)) / Math.sqrt( ((matriz.length * sumaXX) - (sumaX * sumaX)) * ((matriz.length * sumaYY) - (sumaY * sumaY)) )

    console.log(a,b);
    console.log(coeficienteCorreccion);
    d.getElementById('respuestas').classList.remove('d-none')
    d.getElementById('txtCurvaAjusteLineal').textContent = `${a.toFixed(4)}x + (${b.toFixed(4)})`
    d.getElementById('txtCoefCorreccion').textContent = coeficienteCorreccion.toFixed(4)
    d.getElementById('txtCoefDeterminacion').textContent = `${(coeficienteCorreccion*coeficienteCorreccion * 100).toFixed(4)} %`

    matriz.map(dato => curvaAjusteLineal.push( [ dato[0],  ((a*dato[0]) + b)   ] ) )

    console.log(curvaAjusteLineal);
    const curvaAjusteLinealX = curvaAjusteLineal.map(point => point[0] )
    const curvaAjusteLinealY = curvaAjusteLineal.map(point => point[1] )
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: curvaAjusteLinealX,
            datasets: [{
                label: 'Curva de ajuste lineal',
                data: curvaAjusteLinealY,
                backgroundColor: ['rgba(255, 99, 132)'],
                borderColor: ['rgba(255, 99, 132)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                } 
            }
        }
    });
}



$addPoint.addEventListener('click',()=> {
    
    const $div = d.createElement('div')

    const $inputX = d.createElement('input')
    $div.classList.add('row', 'justify-content-center', 'mb-3')

    $inputX.type = "text"
    $inputX.placeholder = 'x'
    $inputX.classList.add('col-4', 'me-2', 'text-center', 'width-100','input-x');

    const $inputY = d.createElement('input')
    $div.classList.add('row', 'justify-content-center', 'mb-3')
    $inputY.type = "text"
    $inputY.placeholder = 'y'
    $inputY.classList.add('col-4', 'me-2', 'text-center', 'width-100','input-y');

    $div.appendChild($inputX)
    $div.appendChild($inputY)
    $form.appendChild($div)
})

