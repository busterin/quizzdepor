// ============ Utilidades de tiempo y UI ============
loadQuestion(STATE.currentQ);
}
}


// ============ Fin de partida y ranking local ============
function endGame() {
// Detener timers
if (STATE.timers.totalId) clearInterval(STATE.timers.totalId);
stopQuestionTimer();


// Mostrar resultado
finalScoreEl.textContent = STATE.score;
show(screenEnd);
renderRanking();
}


function resetGame() {
STATE.totalTime = 120;
STATE.perQuestionTime = 10;
STATE.score = 0;
STATE.currentQ = 0;
updateScore();
timeQEl.textContent = toMMSS(STATE.perQuestionTime);
timeTotEl.textContent = toMMSS(STATE.totalTime);
}


function renderRanking() {
const list = getRanking();
rankingList.innerHTML = '';
list.slice(0, 10).forEach((item, idx) => {
const li = document.createElement('li');
li.textContent = `${idx + 1}. ${item.name} — ${item.score}`;
rankingList.appendChild(li);
});
}


function getRanking() {
try {
const raw = localStorage.getItem('quizRanking');
const arr = raw ? JSON.parse(raw) : [];
return Array.isArray(arr) ? arr.sort((a,b) => b.score - a.score) : [];
} catch { return []; }
}


function saveRanking(name, score) {
const list = getRanking();
list.push({ name, score, at: Date.now() });
localStorage.setItem('quizRanking', JSON.stringify(list));
}


// ============ Eventos UI ============
$('#btn-start').addEventListener('click', () => {
// Ir a la pantalla de preguntas
show(screenQuestion);
resetGame();
startTotalTimer();
loadQuestion(0);
});


$('#btn-restart').addEventListener('click', () => {
show(screenCover);
renderCoverFromPDF();
});


saveForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = $('#username').value.trim() || 'Usuario';
saveRanking(name, STATE.score);
renderRanking();
});


// ============ Inicio ============
window.addEventListener('resize', () => {
// re-render de la portada para mantener nitidez al rotar/cambiar ancho
if (!screenCover.hidden) renderCoverFromPDF();
});


window.addEventListener('DOMContentLoaded', () => {
show(screenCover);
renderCoverFromPDF();
});
