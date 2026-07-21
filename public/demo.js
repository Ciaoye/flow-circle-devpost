const app = document.querySelector('[data-app]');
const content = document.querySelector('[data-content]');
const modal = document.querySelector('[data-modal]');
const toast = document.querySelector('[data-toast]');

let view = 'feed';
let circle = 'all';
let intent = 'record';
let toastTimer;

const circleNames = {
  all: 'All circles',
  wayfarers: "Wayfarers' Exchange",
  human: 'Being Human Study',
  longtan: 'Longtan Commons'
};

const circles = {
  wayfarers: { short: 'W', balance: '+28', role: 'Traveling hosts', reference: 'One hosted night - about 10 circle credits', color: 'pink' },
  human: { short: 'H', balance: '-6', role: 'Learning together', reference: 'One generous review - about 5 circle credits', color: 'yellow' },
  longtan: { short: 'L', balance: '+12', role: 'Living together', reference: 'One family meal - about 4 circle credits', color: 'blue' }
};

const posts = [
  { kind: 'offer', color: 'green', letter: 'A', name: 'Ash', role: 'Repair player', badge: 'I can offer', text: 'This week I can help repair small appliances, and we can learn how to fix them together.', tags: ['small appliances', 'make together'], meta: "Wayfarers' Exchange - Hangzhou" },
  { kind: 'need', color: 'pink', letter: 'M', name: 'Mili', role: 'Table host', badge: 'I am looking for', text: 'On Thursday night, I am looking for someone to review the introduction for my next gathering.', tags: ['30 minutes', 'copy'], meta: 'Being Human Study - Online' },
  { kind: 'trade', color: 'yellow', letter: 'W', name: 'Wang to Shing', role: 'Visible inside the circle', badge: 'Exchange completed', text: 'I stayed in Xiamen for one night. We talked until midnight and shared breakfast the next day.', tags: ['hosting', 'travel'], meta: "Wayfarers' Exchange - 10 circle credits" },
  { kind: 'mystery', color: 'blue', letter: '?', name: 'A mutual-aid moment happened', role: 'Identity and story are hidden', badge: 'Private record', text: 'The people involved chose to keep the care and its details private.', tags: ['care'], meta: 'Longtan Commons - 8 circle credits' },
  { kind: 'card', color: 'coral', letter: 'A', name: 'Tai to Ash', role: 'Cross-circle recognition', badge: 'Care badge', text: 'During the rain, Ash quietly fixed the shared kitchen leak and showed two others how to do it.', tags: ['shared labor', 'teaching'], meta: 'July 12 - seen with care' },
  { kind: 'offer', color: 'green', letter: 'N', name: 'Anan', role: 'Listening practice', badge: 'I can offer', text: 'I have one hour this weekend to sit with whatever has been difficult to say clearly.', tags: ['listening', 'weekend'], meta: 'Being Human Study - Online' }
];

function avatar(letter, color = 'yellow', face = 'wave', small = true) {
  return `<span class="character ${small ? 'character-small ' : ''}character-${color} face-${face}"><i class="character-hair"></i><i class="character-eyes">o o</i><i class="character-smile">-</i><b>${letter}</b></span>`;
}

function pill(label, color = 'cream') {
  return `<span class="pill pill-${color}">${label}</span>`;
}

function sectionTitle(eyebrow, heading, action = 'Filter') {
  return `<div class="section-title"><div><span>${eyebrow}</span><h2>${heading}</h2></div><button data-action="filter">${action} <b>&rarr;</b></button></div>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function feedCard(post) {
  return `<article class="feed-card feed-${post.kind}"><header><button class="feed-person" data-action="profile">${avatar(post.letter, post.color, post.kind === 'mystery' ? 'bob' : 'wave')}<span><b>${post.name}</b><small>${post.role}</small></span></button>${pill(post.badge, post.color)}</header><div class="feed-text">${post.text}</div><div class="chip-row">${post.tags.map((tag) => `<span>#${tag}</span>`).join('')}</div><footer><span>${post.meta}</span><span><button data-action="details">Details</button> <button data-action="share">Share &rarr;</button></span></footer></article>`;
}

function renderFeed() {
  const scope = circle === 'all' ? 'All circles' : circleNames[circle];
  const visiblePosts = circle === 'all' ? posts : posts;
  return `<section class="agent-hero"><div class="hero-decor decor-grid"></div><div class="hero-decor decor-square"></div><div class="hero-decor decor-circle"></div><div class="agent-orb"><i class="agent-antenna"></i><span>o_o</span><b>Bubble</b></div><div class="agent-copy">${pill('ONLINE - BUBBLE ASSISTANT')}<h2>Say one thing,<br />let mutual aid move.</h2><p>I will turn it into a draft you can check and edit.</p></div><button class="speak-button" data-action="say"><span>+</span><b>Say a thing</b><small>Exchange - need - offer - care badge</small></button></section><section class="scope-banner"><span>${circle === 'all' ? 'COMBINED ACTIVITY' : 'CURRENT CIRCLE'}</span><b>${scope}</b><small>${circle === 'all' ? 7 : 3} moments match this view</small></section><section class="stats-grid" aria-label="Activity overview"><button class="stat-card stat-yellow" data-view="profile"><span>${circle === 'all' ? 'circles joined' : 'current balance'}</span><strong>${circle === 'all' ? '3' : circles[circle].balance}</strong><small>${circle === 'all' ? 'each circle has its own account' : 'circle credits'}</small></button><button class="stat-card stat-pink" data-view="profile"><span>I have given</span><strong>${circle === 'all' ? '136' : '86'}</strong><small>community memory, not a ranking</small></button><button class="stat-card stat-blue" data-view="profile"><span>care badges</span><strong>0</strong><small>they travel across circles</small></button></section>${sectionTitle('LIVE FROM THE CIRCLE', `${scope} - All activity`)}<div class="feed-list">${visiblePosts.map(feedCard).join('')}</div>`;
}

function renderDiscover() {
  const cards = posts.filter((post) => post.kind === 'need' || post.kind === 'offer');
  return `<section class="page-hero discover-hero"><div>${pill('CROSS-CIRCLE DISCOVERY', 'pink')}<h2>Someone is looking,<br />and someone can give.</h2><p>Seeing an offer does not mean someone owes you a yes. Start with a question.</p></div><button data-action="say">+ Publish</button></section><div class="filter-row"><button class="active" data-action="filter">All</button><button data-action="filter">Needs</button><button data-action="filter">Offers</button><button data-action="filter">Nearby</button></div><p class="result-note">6 active needs and offers</p><div class="feed-list">${cards.map(feedCard).join('')}</div>`;
}

function renderCircles() {
  const item = circle === 'all' ? circles.wayfarers : circles[circle];
  const current = circle === 'all' ? circleNames.wayfarers : circleNames[circle];
  return `<section class="page-hero circle-hero"><div>${pill('MY CIRCLE - INVITE ONLY')}<h2>${current}</h2><p>Keep the people who have hosted, helped and crossed paths on the same map.</p></div><div class="coin-badge"><span>${item.balance}</span><small>circle credits</small></div></section><div class="circle-actions"><button data-action="say">+ Say a thing</button><button data-action="invite">Invite a member</button><button data-action="intro">Circle introduction</button></div><button class="camp-preview" data-action="intro"><span class="camp-flag">${item.short}</span><div><small>CIRCLE PROFILE</small><h3>${current} is a small boundary for real mutual aid.</h3><p>${item.role} - 18 members</p></div><b>Open intro &rarr;</b></button><section class="balance-panel"><div><span>current balance</span><strong>${item.balance}</strong><small>how this relationship can keep moving</small></div><div><span>given here</span><strong>86</strong><small>from completed mutual aid</small></div><div><span>received here</span><strong>58</strong><small>receiving help is okay too</small></div></section>${sectionTitle('REFERENCE', 'References inside this circle', 'View rules')}<div class="reference-grid"><button data-action="rules"><b>Hosting</b><span>${item.reference}</span></button><button data-action="rules"><b>One family meal</b><span>About 4 circle credits</span></button></div>${sectionTitle('PEOPLE', 'People active lately', 'All members')}<div class="feed-list">${posts.slice(0, 2).map(feedCard).join('')}</div>`;
}

function renderProfile() {
  return `<section class="profile-hero">${avatar('S', 'yellow', 'wave', false)}<div>${pill('CROSS-CIRCLE ROLE CARD')}<h2>Shing H</h2><p>Gathering maker, gift experimenter, still learning how to connect people across places.</p></div><button data-action="share">Generate share card</button></section><section class="passport-card"><div><span>COMMUNITY PASSPORT</span><h3>0 care badges. The complete stories live in the archive.</h3><p>“A new story of thanks will appear here.”</p></div><button data-action="card">+ Send a care badge</button></section>${sectionTitle('FULL ARCHIVE', 'My complete community archive', '')}<div class="archive-grid"><button data-action="details"><strong>0</strong><span>care-badge stories</span><small>see who wrote what</small></button><button data-action="details"><strong>2</strong><span>needs / offers</span><small>including past posts</small></button><button data-action="details"><strong>4</strong><span>mutual-aid records</span><small>public, private and corrected</small></button></div>${sectionTitle('OPEN NOW', 'What I need / can give', 'Visibility')}<section class="my-board"><div class="my-need">${pill('I AM LOOKING FOR', 'pink')}<h3>A thoughtful review of an event invitation.</h3><span>Visible across circles - See details</span></div><div class="my-offer">${pill('I CAN OFFER', 'green')}<h3>A listening hour this weekend.</h3><span>Two circles can see it - See details</span></div></section>`;
}

function renderCreate() {
  return `<section class="page-hero create-hero"><div>${pill('ANYONE CAN CREATE A CIRCLE', 'cream')}<h2>Give a real relationship<br />a clear boundary.</h2><p>A circle is an independent group of people, rules and mutual-aid records.</p></div><button data-action="preview">Start here</button></section><div class="create-progress"><div class="active"><b>01</b><br />Circle identity</div><div><b>02</b><br />Mutual aid</div><div><b>03</b><br />Members and boundary</div><div><b>04</b><br />Preview</div></div><section class="create-panel"><span class="sheet-kicker">STEP 01 - IDENTITY</span><h3>Who does this circle connect?</h3><p>Start with the relationship on the ground. You do not need to make it useful to everyone.</p><label class="sheet-kicker">CIRCLE NAME</label><div class="fake-field">Weekend Makers' Table</div><label class="sheet-kicker">ONE-SENTENCE DESCRIPTION</label><div class="fake-field">A local group for shared meals, tools and repair skills.</div><button class="create-primary" data-action="preview">Continue to mutual-aid settings &rarr;</button></section>`;
}

function render() {
  const titles = { feed: ['MY CIRCLE ACTIVITY', 'Hello, Shing!'], discover: ['DISCOVER ACROSS CIRCLES', 'Discover'], circles: ['CIRCLE SPACE', 'Circles'], profile: ['MY CROSS-CIRCLE IDENTITY', 'My profile'], create: ['NEW CIRCLE - CREATION GUIDE', 'Create a circle'] };
  document.querySelector('[data-header-kicker]').textContent = titles[view][0];
  document.querySelector('[data-header-title]').textContent = titles[view][1];
  document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
  document.querySelectorAll('[data-circle]').forEach((button) => {
    const selected = button.dataset.circle === circle;
    button.classList.toggle('active', selected);
    button.classList.toggle('selected', selected);
  });
  content.innerHTML = view === 'feed' ? renderFeed() : view === 'discover' ? renderDiscover() : view === 'circles' ? renderCircles() : view === 'profile' ? renderProfile() : renderCreate();
}

function openComposer() {
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">BUBBLE ASSISTANT</span><h2>What do you want to let move?</h2><p>Choose a starting point. You can check and edit it before anything is recorded.</p><div class="intent-grid"><button class="intent-card ${intent === 'record' ? 'active' : ''}" data-intent="record"><b>Record a moment</b><small>A completed exchange</small></button><button class="intent-card ${intent === 'need' ? 'active' : ''}" data-intent="need"><b>I need something</b><small>Ask the circle</small></button><button class="intent-card ${intent === 'offer' ? 'active' : ''}" data-intent="offer"><b>I can offer</b><small>Make room for a skill</small></button><button class="intent-card ${intent === 'card' ? 'active' : ''}" data-intent="card"><b>Send a care badge</b><small>Leave recognition</small></button></div><div class="voice-card"><span class="sheet-kicker">SAY IT LIKE YOU WOULD SAY IT</span><p data-modal-copy></p></div><div class="sheet-actions"><button data-action="close">Close</button><button class="confirm" data-action="draft">Ask Bubble to sort it &rarr;</button></div></section>`;
  updateIntent(intent);
}

function updateIntent(next) {
  intent = next;
  const copy = { record: '“Remember this: yesterday Wang hosted me for one night. Count 10 circle credits.”', need: '“I need someone to review my workshop copy for 30 minutes.”', offer: '“I can offer a listening hour this weekend.”', card: '“Send Ash a care badge: they fixed the shared kitchen leak without being asked.”' };
  modal.querySelector('[data-modal-copy]').textContent = copy[next];
  modal.querySelectorAll('[data-intent]').forEach((button) => button.classList.toggle('active', button.dataset.intent === next));
}

function showDraft() {
  const drafts = { record: ['Mutual exchange completed - 10 circle credits', 'Wang hosted one night. This is a circle record of contribution and receipt, not a debt.'], need: ['Need - Workshop copy review', 'Looking for honest feedback for 30 minutes. Visible to the Being Human Study.'], offer: ['Offer - Listening hour', 'One open slot this weekend. An offer is never a contract.'], card: ['Care badge for Ash', 'They repaired the shared kitchen leak. Recognition creates no balance.'] };
  const draft = drafts[intent];
  modal.innerHTML = `<section class="sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">BUBBLE ASSISTANT - REVIEW</span><h2>Does this look right?</h2><p>You can edit, publish, refuse or leave it unrecorded.</p><div class="draft-card"><span class="sheet-kicker">DRAFT - CHECK BEFORE SHARING</span><h3>${draft[0]}</h3><p>${draft[1]}</p></div><div class="sheet-actions"><button data-action="back">Back to edit</button><button class="confirm" data-action="confirm">Confirm static draft &rarr;</button></div></section>`;
}

function handleAction(action) {
  if (action === 'say' || action === 'card') { if (action === 'card') intent = 'card'; openComposer(); return; }
  if (action === 'close') { modal.hidden = true; return; }
  if (action === 'draft') { showDraft(); return; }
  if (action === 'back') { openComposer(); return; }
  if (action === 'confirm') { modal.hidden = true; showToast(intent === 'card' ? 'Care badge added to the static passport.' : 'Draft confirmed in this static demo.'); return; }
  if (action === 'share') { showToast('Share-card preview generated for this static demo.'); return; }
  if (action === 'filter') { showToast('Filter changed in this static demo.'); return; }
  if (action) showToast('This interaction is represented in the full product flow.');
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.view) { view = target.dataset.view; render(); return; }
  if (target.dataset.circle) { circle = target.dataset.circle; if (view !== 'circles' && view !== 'profile') view = 'feed'; render(); return; }
  handleAction(target.dataset.action);
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) { modal.hidden = true; return; }
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.intent) { updateIntent(target.dataset.intent); return; }
  handleAction(target.dataset.action);
});

render();
