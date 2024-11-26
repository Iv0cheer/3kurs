const constellations = document.querySelectorAll('.constellation');
const tooltip = document.getElementById('tooltip');

constellations.forEach(constellation => {
    constellation.addEventListener('mouseenter', (event) => {
        const info = constellation.getAttribute('kartochka');
        tooltip.innerHTML = info;
        tooltip.style.display = 'block';
    });

    constellation.addEventListener('mousemove', (event) => {
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });

    constellation.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});