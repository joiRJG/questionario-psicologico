document.getElementById('questionario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const respostas = {};
    const elementos = this.elements;
    
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].type === 'radio' && elementos[i].checked) {
            const name = elementos[i].name;
            const value = elementos[i].value;
            if (respostas[name]) {
                respostas[name].push(value);
            } else {
                respostas[name] = [value];
            }
        }
    }
    
    const diagnosticos = { "TDAH": 0, "TEA": 0, "Normal": 0, "Ansiedade": 0 };
    
    for (let key in respostas) {
        respostas[key].forEach(resposta => {
            diagnosticos[resposta]++;
        });
    }
    
    const diagnosticoFinal = Object.keys(diagnosticos).reduce((a, b) => diagnosticos[a] > diagnosticos[b] ? a : b);
    
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    resultado.innerHTML = `<h2>Diagnóstico provável: ${diagnosticoFinal}</h2>`;
    for (let diagnostico in diagnosticos) {
        resultado.innerHTML += `<p>${diagnostico}: ${diagnosticos[diagnostico]}</p>`;
    }
});
