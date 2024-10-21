// Elementos del DOM
const listaDiarios = document.getElementById('lista-diarios');
const listaSemanales = document.getElementById('lista-semanales');
const formDiarios = document.getElementById('form-diarios');
const formSemanales = document.getElementById('form-semanales');
const inputDiario = document.getElementById('input-diario');
const inputSemanal = document.getElementById('input-semanal');
const animacionVictoria = document.getElementById('animacion-victoria');

// Cargar las tareas desde LocalStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cargarTareas('diarios', listaDiarios);
  cargarTareas('semanales', listaSemanales);
});

// Función para agregar una tarea
function agregarTarea(lista, tarea, tipo) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = tarea.completada;

  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(` ${tarea.texto}`));
  lista.appendChild(li);

  // Guardar cambios en LocalStorage cada vez que se marque una tarea
  checkbox.addEventListener('change', () => {
    guardarTareas(tipo, lista);
    if (tipo === 'diarios') verificarCompletados();
  });
}

// Guardar tareas en LocalStorage
function guardarTareas(tipo, lista) {
  const tareas = Array.from(lista.children).map(li => ({
    texto: li.textContent.trim(),
    completada: li.querySelector('input').checked
  }));
  localStorage.setItem(tipo, JSON.stringify(tareas));
}

// Cargar tareas desde LocalStorage
function cargarTareas(tipo, lista) {
  const tareasGuardadas = JSON.parse(localStorage.getItem(tipo)) || [];
  tareasGuardadas.forEach(tarea => agregarTarea(lista, tarea, tipo));
}

// Verificar si todas las tareas diarias están completas
function verificarCompletados() {
  const todosCompletos = Array.from(listaDiarios.querySelectorAll('input'))
    .every(input => input.checked);
  if (todosCompletos) {
    animacionVictoria.classList.remove('oculto');
  } else {
    animacionVictoria.classList.add('oculto');
  }
}

// Agregar tareas diarias desde el formulario
formDiarios.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputDiario.value.trim();
  if (texto) {
    agregarTarea(listaDiarios, { texto, completada: false }, 'diarios');
    guardarTareas('diarios', listaDiarios);
    inputDiario.value = '';
  }
});

// Agregar tareas semanales desde el formulario
formSemanales.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputSemanal.value.trim();
  if (texto) {
    agregarTarea(listaSemanales, { texto, completada: false }, 'semanales');
    guardarTareas('semanales', listaSemanales);
    inputSemanal.value = '';
  }
});
