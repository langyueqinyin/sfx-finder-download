const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const demoResults = document.querySelectorAll('.result');
demoResults.forEach((result) => {
  result.addEventListener('click', () => {
    demoResults.forEach((row) => row.classList.remove('active'));
    result.classList.add('active');
  });
});
