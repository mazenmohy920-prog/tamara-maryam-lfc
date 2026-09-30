const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enterBtn');
const soundBtn = document.getElementById('soundBtn');
const youtubeWrap = document.getElementById('youtubeWrap');
const siteMusic = document.getElementById('siteMusic');
const musicToggle = document.getElementById('musicToggle');
const musicDock = document.getElementById('musicDock');

let musicOn = false;

async function startLiverpoolMusic(){
  try {
    siteMusic.volume = 0.78;
    await siteMusic.play();
    musicOn = true;
    musicToggle.textContent = '❚❚';
    musicToggle.setAttribute('aria-label', 'Pause music');
    musicDock.classList.remove('paused');
  } catch (err) {
    // If a browser blocks playback, the visitor can press the dock button again.
    musicOn = false;
    musicToggle.textContent = '▶';
    musicToggle.setAttribute('aria-label', 'Play music');
  }
}

enterBtn.addEventListener('click', async () => {
  intro.classList.add('hide');
  await startLiverpoolMusic();
  window.scrollTo({top:0, behavior:'instant'});
});

musicToggle.addEventListener('click', async () => {
  if (siteMusic.paused) {
    await startLiverpoolMusic();
  } else {
    siteMusic.pause();
    musicOn = false;
    musicToggle.textContent = '▶';
    musicToggle.setAttribute('aria-label', 'Play music');
    musicDock.classList.add('paused');
  }
});

soundBtn.addEventListener('click', () => {
  youtubeWrap.classList.toggle('hidden');
  soundBtn.textContent = youtubeWrap.classList.contains('hidden')
    ? "▶ WATCH YOU'LL NEVER WALK ALONE"
    : "▲ CLOSE FAN VIDEO";
  if (!youtubeWrap.classList.contains('hidden')) {
    youtubeWrap.scrollIntoView({behavior:'smooth', block:'center'});
  }
});

const gameBox = document.getElementById('gameBox');
document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('click', () => {
    const game = card.dataset.game;
    gameBox.classList.remove('hidden');

    if (game === 'quiz') {
      gameBox.innerHTML = `
        <h3>LFC QUIZ</h3>
        <p style="margin-top:10px;color:#aaa">Which stadium is Liverpool FC's home?</p>
        <button data-answer="wrong">Old Trafford</button>
        <button data-answer="right">Anfield</button>
        <button data-answer="wrong">Emirates</button>
        <p id="gameResult" style="margin-top:15px"></p>`;
      gameBox.querySelectorAll('button').forEach(b => b.onclick = () => {
        document.getElementById('gameResult').textContent =
          b.dataset.answer === 'right' ? '🔥 Correct! You know your Reds.' : 'Not this one — try again!';
      });
    }

    if (game === 'penalty') {
      gameBox.innerHTML = `
        <h3>PENALTY SHOOTOUT</h3>
        <p style="margin-top:10px;color:#aaa">Pick a corner. The keeper is waiting.</p>
        <button class="shot">↖ LEFT</button><button class="shot">↑ CENTER</button><button class="shot">↗ RIGHT</button>
        <p id="gameResult" style="margin-top:15px"></p>`;
      gameBox.querySelectorAll('.shot').forEach(b => b.onclick = () => {
        const save = Math.floor(Math.random()*3);
        const choice = [...gameBox.querySelectorAll('.shot')].indexOf(b);
        document.getElementById('gameResult').textContent =
          choice === save ? '🧤 SAVED! The keeper read it.' : '⚽ GOOOOAL! The Kop erupts!';
      });
    }

    if (game === 'guess') {
      gameBox.innerHTML = `
        <h3>GUESS THE RED</h3>
        <p style="margin-top:10px;color:#aaa">Egyptian forward • Number 11 • Liverpool legend.</p>
        <button data-right="1">MO SALAH</button><button data-right="0">VIRGIL VAN DIJK</button>
        <p id="gameResult" style="margin-top:15px"></p>`;
      gameBox.querySelectorAll('button').forEach(b => b.onclick = () => {
        document.getElementById('gameResult').textContent =
          b.dataset.right === '1' ? '👑 Correct — Mo Salah!' : 'Try again!';
      });
    }
    gameBox.scrollIntoView({behavior:'smooth', block:'center'});
  });
});


const playerData = {
  alisson:{name:'Alisson Becker',meta:'01 • GOALKEEPER • BRAZIL',bio:'Liverpool’s elite goalkeeper and one of the game’s most composed shot-stoppers. A calm presence behind the defence with world-class distribution.',stats:[['Position','Goalkeeper'],['Nationality','Brazil'],['Role','First-team goalkeeper'],['Known for','Reflexes & distribution']]},
  vandijk:{name:'Virgil van Dijk',meta:'04 • DEFENDER • CAPTAIN • NETHERLANDS',bio:'Liverpool captain and commanding centre-back. Known for his aerial strength, positioning, leadership and calmness under pressure.',stats:[['Position','Centre-back'],['Nationality','Netherlands'],['Role','Captain'],['Known for','Leadership & defending']]},
  wirtz:{name:'Florian Wirtz',meta:'07 • MIDFIELDER • GERMANY',bio:'Creative attacking midfielder with close control, vision and the ability to unlock compact defences with a pass or a clever movement.',stats:[['Position','Attacking midfielder'],['Nationality','Germany'],['Role','Creative playmaker'],['Known for','Vision & technique']]},
  szoboszlai:{name:'Dominik Szoboszlai',meta:'08 • MIDFIELDER • VICE-CAPTAIN • HUNGARY',bio:'Powerful midfielder who combines athleticism, long-range shooting and set-piece quality with relentless energy.',stats:[['Position','Midfielder'],['Nationality','Hungary'],['Role','Vice-captain'],['Known for','Power & set pieces']]}
};
const playerModal=document.getElementById('playerModal');
const modalVisual=document.getElementById('modalVisual');
const modalMeta=document.getElementById('modalMeta');
const modalName=document.getElementById('modalName');
const modalBio=document.getElementById('modalBio');
const modalStats=document.getElementById('modalStats');
function openPlayer(card){const d=playerData[card.dataset.player];if(!d)return;modalMeta.textContent=d.meta;modalName.textContent=d.name;modalBio.textContent=d.bio;modalStats.innerHTML=d.stats.map(x=>`<div class="modal-stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');const bg=getComputedStyle(card).getPropertyValue('--player-img');modalVisual.style.backgroundImage=bg;playerModal.classList.remove('hidden');document.body.style.overflow='hidden'}
function closePlayer(){playerModal.classList.add('hidden');document.body.style.overflow=''}
document.querySelectorAll('.player-card').forEach(card=>{card.tabIndex=0;card.addEventListener('click',()=>openPlayer(card));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openPlayer(card)}})});
document.querySelectorAll('[data-close-player]').forEach(el=>el.addEventListener('click',closePlayer));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!playerModal.classList.contains('hidden'))closePlayer()});
