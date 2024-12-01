// Función que observa las secciones y les agrega una clase cuando son visibles
function observeSections() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando la sección es visible, le agregamos la clase 'visible-section'
                entry.target.classList.add('visible-section');
                observer.unobserve(entry.target); // Deja de observar la sección una vez es visible
            }
        });
    }, { threshold: 0.5 }); // Umbral de visibilidad (50%)

    // Seleccionamos todas las secciones con la clase 'hidden-section' y las observamos
    const sections = document.querySelectorAll('.hidden-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Llamamos a la función cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', observeSections);




document.addEventListener('DOMContentLoaded', function () {
  // Función para cargar el acordeón desde el archivo JSON
  fetch('archivo.json')  // Asegúrate de que la ruta es correcta
      .then(response => response.json())  // Convierte el archivo JSON a un objeto JavaScript
      .then(data => {
          // Ordenar los items por el campo 'titulo' alfabéticamente
          data.acordeon.sort((a, b) => a.titulo.localeCompare(b.titulo));

          // Guardar los elementos del acordeón en una variable global para el filtrado posterior
          const items = [];

          // Iterar sobre los items del acordeón
          data.acordeon.forEach((item, index) => {
              // Crear el div para cada item del acordeón
              const accordionItem = document.createElement('div');
              accordionItem.classList.add('accordion-item');
              accordionItem.setAttribute('data-title', item.titulo.toLowerCase()); // Añadir un atributo para la búsqueda

              // Crear el input tipo checkbox para el acordeón
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.id = `item${index + 1}`;

              // Crear el label con el título de la categoría
              const label = document.createElement('label');
              label.setAttribute('for', checkbox.id);
              label.textContent = item.titulo;

              // Crear el contenedor para el contenido
              const content = document.createElement('div');
              content.classList.add('content');

              // Crear el contenedor que contiene la imagen y la lista de productos
              const contentWrapper = document.createElement('div');
              contentWrapper.classList.add('content-wrapper');

              // Crear la imagen
              const img = document.createElement('img');
              img.src = item.imagen;
              img.alt = "Imagen relacionada";
              img.classList.add('accordion-image');
              contentWrapper.appendChild(img);

              // Crear la lista de productos
              const productList = document.createElement('ul');
              item.productos.forEach(producto => {
                  const li = document.createElement('li');
                  const h5 = document.createElement('h5');
                  h5.textContent = producto;
                  li.appendChild(h5);
                  productList.appendChild(li);
              });

              // Agregar la lista de productos al contenedor
              contentWrapper.appendChild(productList);

              // Agregar el contenedor de contenido al div de acordeón
              content.appendChild(contentWrapper);

              // Agregar el checkbox, label y el contenido al item del acordeón
              accordionItem.appendChild(checkbox);
              accordionItem.appendChild(label);
              accordionItem.appendChild(content);

              // Agregar el item completo al contenedor principal del acordeón
              acordeonContainer.appendChild(accordionItem);

              // Guardar el item en el array para futuras referencias
              items.push(accordionItem);
          });

          // Filtrar los elementos del acordeón cuando el usuario escribe en el campo de búsqueda
          const searchInput = document.getElementById('searchInput');
          searchInput.addEventListener('input', function () {
              const filter = searchInput.value.toLowerCase();  // Obtener el valor de búsqueda en minúsculas

              items.forEach(item => {
                  const title = item.getAttribute('data-title');  // Obtener el título en minúsculas
                  // Si el título incluye el texto de búsqueda, mostrar el item; si no, ocultarlo
                  if (title.includes(filter)) {
                      item.style.display = '';  // Mostrar el item
                  } else {
                      item.style.display = 'none';  // Ocultar el item
                  }
              });
          });
      })
      .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
      });
});



