const app = document.querySelector('[data-app]');
const content = document.querySelector('[data-content]');
const modal = document.querySelector('[data-modal]');
const toast = document.querySelector('[data-toast]');

let view = 'feed';
let circle = 'all';
let intent = 'record';
let activeFilter = 'all';
let createStep = 1;
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

const members = {
  shing: { letter: 'S', name: 'Shing H', role: 'Traveling exchange maker', color: 'yellow', bio: 'A gathering maker and gift experimenter, learning how people who once helped each other can keep meeting across places.', wechat: 'shing_flow', circles: ['wayfarers', 'human', 'longtan'], balances: { wayfarers: '+28', human: '-6', longtan: '+12' } },
  ash: { letter: 'A', name: 'Ash', role: 'Repair player', color: 'green', bio: 'Repairs small appliances and likes turning a fix into something people can learn together.', wechat: 'ash_repairs', circles: ['wayfarers', 'longtan'], balances: { wayfarers: '+16', longtan: '+7' } },
  mili: { letter: 'M', name: 'Mili', role: 'Table host', color: 'pink', bio: 'Sets an extra bowl at the table and makes it easier for newcomers to sit down.', wechat: 'mili_table', circles: ['human', 'longtan'], balances: { human: '-4', longtan: '+5' } },
  wang: { letter: 'W', name: 'Wang', role: 'Traveling host', color: 'yellow', bio: 'Collects city knowledge, spare sofas, and the small rituals that make a temporary stay feel like home.', wechat: 'wang_ontheroad', circles: ['wayfarers'], balances: { wayfarers: '+22' } },
  tai: { letter: 'T', name: 'Tai', role: 'Plant caretaker', color: 'coral', bio: 'Takes care of leaves, shared corners, and the instructions people leave for one another.', wechat: 'tai_plants', circles: ['wayfarers', 'longtan'], balances: { wayfarers: '+9', longtan: '+3' } },
  anan: { letter: 'N', name: 'Anan', role: 'Listening practitioner', color: 'coral', bio: 'Practices receiving a whole sentence before rushing to offer advice.', wechat: 'anan_listens', circles: ['human'], balances: { human: '-8' } },
  mumu: { letter: 'M', name: 'Mumu', role: 'Woodwork apprentice', color: 'green', bio: 'Likes old wood, simple structures, and repairing common space together.', wechat: 'wood_mumu', circles: ['longtan'], balances: { longtan: '+7' } }
};

const circleDetails = {
  wayfarers: { title: "Wayfarers' Exchange", location: 'Cross-city · known introductions', currency: 'Circle credits', members: ['shing', 'ash', 'wang', 'tai'], intro: 'A small circle grown from real exchange relationships: hosting, event collaboration, consultation, meals and small favors. Not every gift needs to become a number; the record only helps help travel further.', joining: 'Seed stage · invited members join directly', rules: ['Record only mutual aid that has already happened.', 'A record can be corrected, refused or withdrawn by the people involved.', 'A completed exchange changes the circle record, not a personal debt between two people.', 'Care badges are stories of appreciation. They never create a balance.'], references: [['One hosted night', 'about 10 circle credits'], ['One family meal', 'about 4 circle credits'], ['A small half-hour favor', 'about 2 circle credits']] },
  human: { title: 'Being Human Study', location: 'Online first · moderated', currency: 'Human points', members: ['shing', 'mili', 'anan'], intro: 'A study circle where feedback, attention, small workshops and listening practice can be remembered alongside learning. Human points are not course fees or a contribution ranking.', joining: 'Growing stage · invitation with moderator approval', rules: ['Needs and offers may be shared across circles, but study conversations stay in the circle.', 'A negative balance is not a credit stain.', 'Sensitive stories can stay private or remain unrecorded.', 'Members can pause or leave without penalty.'], references: [['A copy review', 'about 3 human points'], ['A small skills session', 'about 8 human points'], ['One listening hour', 'about 5 human points']] },
  longtan: { title: 'Longtan Commons', location: 'Longtan · living together', currency: 'Meal tickets', members: ['shing', 'ash', 'mili', 'tai', 'mumu'], intro: 'A live-in commons for shared meals, tools, rides and daily care. Meal tickets do not measure who matters more; they help common labor stop depending on only a few people remembering it.', joining: 'Seed stage · confirm in person', rules: ['Tool borrowing is agreed in the existing group chat first.', 'Addresses, health and care details do not enter public records.', 'A mystery record can hide people and the story while preserving the type and time of mutual aid.', 'Visitors can pause or leave; hosting is never mandatory.'], references: [['One shared meal', 'about 4 meal tickets'], ['Half a day of tool work', 'about 6 meal tickets'], ['One ride', 'about 5 meal tickets']] }
};

const posts = [
  { id: 'ash-offer', member: 'ash', circle: 'wayfarers', kind: 'offer', color: 'green', letter: 'A', name: 'Ash', role: 'Repair player', badge: 'I can offer', text: 'This week I can help repair small appliances, and we can learn how to fix them together.', tags: ['small appliances', 'make together'], meta: "Wayfarers' Exchange · Hangzhou", detail: 'This week, in Hangzhou. It is an offer to start a conversation — not a promise to repair every appliance.', reference: 'about 2–5 circle credits', visibility: 'cross-circle' },
  { id: 'mili-need', member: 'mili', circle: 'human', kind: 'need', color: 'pink', letter: 'M', name: 'Mili', role: 'Table host', badge: 'I am looking for', text: 'On Thursday night, I am looking for someone to review the introduction for my next gathering.', tags: ['30 minutes', 'copy'], meta: 'Being Human Study · online', detail: 'Thursday evening, online. Mili is looking for one honest pair of eyes for a gathering introduction.', reference: 'about 3 human points', visibility: 'cross-circle' },
  { id: 'wang-stay', member: 'wang', circle: 'wayfarers', kind: 'trade', color: 'yellow', letter: 'W', name: 'Wang hosted Shing', role: 'Completed mutual aid', badge: 'Exchange completed', text: 'Shing stayed in Xiamen for one night. They talked until midnight and shared breakfast the next day.', tags: ['hosting', 'travel'], meta: "Wayfarers' Exchange · 10 circle credits", detail: 'Happened July 14 and recorded July 15. Wang contributed a hosted night; Shing received it. The circle holds the movement, not a private debt.', reference: '10 circle credits · confirmed', visibility: 'inside the circle' },
  { id: 'care-mystery', member: null, circle: 'longtan', kind: 'mystery', color: 'blue', letter: '?', name: 'A mutual-aid moment happened', role: 'Identity and story are hidden', badge: 'Private record', text: 'The people involved chose to keep the care and its details private.', tags: ['care'], meta: 'Longtan Commons · 8 meal tickets', detail: 'The people involved chose a mystery record. The circle can acknowledge that mutual aid happened without exposing who or what it was.', reference: '8 meal tickets · private', visibility: 'mystery record' },
  { id: 'tai-card', member: 'ash', circle: 'longtan', kind: 'card', color: 'coral', letter: 'A', name: 'Tai thanked Ash', role: 'Cross-circle recognition', badge: 'Care badge', text: 'During the rain, Ash quietly fixed the shared kitchen leak and showed two others how to do it.', tags: ['shared labor', 'teaching'], meta: 'July 12 · seen with care', detail: 'Tai wrote this after receiving help. It is a recognition story only: no credits, no repayment, and no score.', reference: 'recognition only · no balance', visibility: 'cross-circle' },
  { id: 'anan-offer', member: 'anan', circle: 'human', kind: 'offer', color: 'green', letter: 'N', name: 'Anan', role: 'Listening practitioner', badge: 'I can offer', text: 'I have one hour this weekend to sit with whatever has been difficult to say clearly.', tags: ['listening', 'weekend'], meta: 'Being Human Study · online', detail: 'One open hour this weekend. Anan can listen; there is no expectation that every request will receive a yes.', reference: 'about 5 human points', visibility: 'inside the circle' },
  { id: 'mumu-need', member: 'mumu', circle: 'longtan', kind: 'need', color: 'pink', letter: 'M', name: 'Mumu', role: 'Woodwork apprentice', badge: 'I am looking for', text: 'On Saturday morning, I need a car to move reclaimed wood from town to the camp.', tags: ['ride', 'Saturday'], meta: 'Longtan Commons · nearby', detail: 'A practical request for one car on Saturday morning. Fuel costs, if any, are discussed separately.', reference: 'about 5 meal tickets', visibility: 'inside the circle' }
];

let selectedMemberId = 'shing';
let selectedPostId = 'ash-offer';

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

function filterButtons(kinds = ['all', 'need', 'offer', 'card']) {
  const labels = { all: 'All', need: 'Needs', offer: 'Offers', card: 'Care badges', mystery: 'Private records' };
  return `<div class="filter-row" aria-label="Filter activity">${kinds.map((kind) => `<button class="${activeFilter === kind ? 'active' : ''}" data-filter="${kind}">${labels[kind]}</button>`).join('')}</div>`;
}

function showInfo(title, copy, actionLabel = 'Close') {
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">FLOW CIRCLE</span><h2>${title}</h2><div class="draft-card"><p>${copy}</p></div><div class="sheet-actions"><button class="confirm" data-action="close">${actionLabel}</button></div></section>`;
}

function feedCard(post) {
  const person = post.member
    ? `<button class="feed-person" data-member="${post.member}">${avatar(post.letter, post.color, post.kind === 'mystery' ? 'bob' : 'wave')}<span><b>${post.name}</b><small>${post.role}</small></span></button>`
    : `<button class="feed-person" data-post="${post.id}">${avatar(post.letter, post.color, 'bob')}<span><b>${post.name}</b><small>${post.role}</small></span></button>`;
  return `<article class="feed-card feed-${post.kind}"><header>${person}${pill(post.badge, post.color)}</header><button class="feed-open" data-post="${post.id}"><span class="feed-text">${post.text}</span><span class="chip-row">${post.tags.map((tag) => `<i>#${tag}</i>`).join('')}</span></button><footer><span>${post.meta}</span><span><button data-post="${post.id}">Details</button> <button data-action="share">Share &rarr;</button></span></footer></article>`;
}

function renderFeed() {
  const scope = circle === 'all' ? 'All circles' : circleNames[circle];
  const scopedPosts = circle === 'all' ? posts : posts.filter((post) => post.circle === circle);
  const visiblePosts = activeFilter === 'all' ? scopedPosts : scopedPosts.filter((post) => post.kind === activeFilter);
  return `<section class="agent-hero"><div class="hero-decor decor-grid"></div><div class="hero-decor decor-square"></div><div class="hero-decor decor-circle"></div><div class="agent-orb"><i class="agent-antenna"></i><span>o_o</span><b>Bubble</b></div><div class="agent-copy">${pill('ONLINE - BUBBLE ASSISTANT')}<h2>Say one thing,<br />let mutual aid move.</h2><p>I will turn it into a draft you can check and edit.</p></div><button class="speak-button" data-action="say"><span>+</span><b>Say a thing</b><small>Exchange - need - offer - care badge</small></button></section><section class="scope-banner"><span>${circle === 'all' ? 'COMBINED ACTIVITY' : 'CURRENT CIRCLE'}</span><b>${scope}</b><small>${visiblePosts.length} moments match this view</small></section><section class="stats-grid" aria-label="Activity overview"><button class="stat-card stat-yellow" data-view="profile"><span>${circle === 'all' ? 'circles joined' : 'current balance'}</span><strong>${circle === 'all' ? '3' : circles[circle].balance}</strong><small>${circle === 'all' ? 'each circle has its own account' : 'circle credits'}</small></button><button class="stat-card stat-pink" data-view="profile"><span>I have given</span><strong>${circle === 'all' ? '136' : '86'}</strong><small>community memory, not a ranking</small></button><button class="stat-card stat-blue" data-view="profile"><span>care badges</span><strong>0</strong><small>they travel across circles</small></button></section>${sectionTitle('LIVE FROM THE CIRCLE', `${scope} - activity`)}${filterButtons()}<div class="feed-list">${visiblePosts.map(feedCard).join('') || '<p class="result-note">Nothing matches this filter yet.</p>'}</div>`;
}

function renderDiscover() {
  const cards = posts.filter((post) => (post.kind === 'need' || post.kind === 'offer') && (activeFilter === 'all' || post.kind === activeFilter));
  return `<section class="page-hero discover-hero"><div>${pill('CROSS-CIRCLE DISCOVERY', 'pink')}<h2>Someone is looking,<br />and someone can give.</h2><p>Seeing an offer does not mean someone owes you a yes. Start with a question.</p></div><button data-action="say">+ Publish</button></section>${filterButtons(['all', 'need', 'offer'])}<p class="result-note">${cards.length} active needs and offers</p><div class="feed-list">${cards.map(feedCard).join('') || '<p class="result-note">Nothing matches this filter yet.</p>'}</div>`;
}

function renderCircles() {
  const id = circle === 'all' ? 'wayfarers' : circle;
  const item = circleDetails[id];
  const balance = members.shing.balances[id] ?? '+0';
  const circlePosts = posts.filter((post) => post.circle === id);
  return `<section class="page-hero circle-hero"><div>${pill(`MY CIRCLE · ${item.location.toUpperCase()}`, 'cream')}<h2>${item.title}</h2><p>${item.intro}</p></div><div class="coin-badge"><span>${balance}</span><small>${item.currency}</small></div></section><div class="circle-actions"><button data-action="say">● Say a thing</button><button data-action="invite">Invite a member</button><button data-action="intro">Circle introduction</button></div><button class="camp-preview" data-action="intro"><span class="camp-flag">${item.title[0]}</span><div><small>CIRCLE PROFILE</small><h3>${item.intro}</h3><p>${item.joining} · ${item.members.length} sample members</p></div><b>Open intro &rarr;</b></button><section class="balance-panel"><div><span>current balance</span><strong>${balance}</strong><small>how help can keep moving</small></div><div><span>given here</span><strong>${id === 'wayfarers' ? '86' : id === 'human' ? '24' : '26'}</strong><small>from completed mutual aid</small></div><div><span>received here</span><strong>${id === 'wayfarers' ? '58' : id === 'human' ? '30' : '14'}</strong><small>receiving help is okay too</small></div></section>${sectionTitle('REFERENCE', 'References inside this circle', 'View rules')}<div class="reference-grid">${item.references.map(([label, value]) => `<button data-action="rules"><b>${label}</b><span>${value}</span></button>`).join('')}</div>${sectionTitle('PEOPLE', 'People active lately', 'All members')}<div class="member-row">${item.members.slice(0, 4).map((memberId) => { const member = members[memberId]; return `<button data-member="${memberId}">${avatar(member.letter, member.color, 'wave')}<b>${member.name}</b><small>${member.role}</small></button>`; }).join('')}</div><div class="circle-feed">${sectionTitle(`${circlePosts.length} EVENTS IN THIS CIRCLE`, `${item.title} activity`)}<div class="feed-list">${circlePosts.map(feedCard).join('')}</div></div>`;
}

function renderProfile() {
  const me = members.shing;
  const myPosts = posts.filter((post) => post.member === 'shing');
  const visibleCards = posts.filter((post) => post.kind === 'card' && post.member === 'shing').length;
  return `<section class="profile-hero">${avatar(me.letter, me.color, 'wave', false)}<div>${pill('CROSS-CIRCLE ROLE CARD')}<h2>${me.name}</h2><p>${me.bio}</p></div><button data-action="share">Generate share card</button></section><section class="passport-card"><div><span>COMMUNITY PASSPORT</span><h3>${visibleCards} care-badge stories, plus the moments I carry privately</h3><p>“Someone once made it easier to ask.”</p></div><button data-action="card">+ Send a care badge</button></section>${sectionTitle('FULL ARCHIVE', 'My complete community archive', '')}<div class="archive-grid"><button data-member="shing"><strong>${visibleCards}</strong><span>care-badge stories</span><small>see who wrote what</small></button><button data-member="shing"><strong>${myPosts.length || 2}</strong><span>needs / offers</span><small>including paused and past posts</small></button><button data-member="shing"><strong>4</strong><span>mutual-aid records</span><small>public, private and corrected</small></button></div>${sectionTitle('OPEN NOW', 'What I need / can give', 'Visibility')}<section class="my-board"><button class="my-need" data-action="say">${pill('I AM LOOKING FOR', 'pink')}<h3>One night in Quanzhou.</h3><span>Visible across circles · say it in your own words</span></button><button class="my-offer" data-action="say">${pill('I CAN OFFER', 'green')}<h3>Event design and one hour of consultation.</h3><span>Each circle can decide how to hold it</span></button></section>`;
}

function renderCreate() {
  const steps = ['Circle identity', 'Mutual aid', 'Members and boundary', 'Preview'];
  const panels = {
    1: `<span class="sheet-kicker">STEP 01 - IDENTITY</span><h3>Who does this circle connect?</h3><p>Start with the relationship on the ground. You do not need to make it useful to everyone.</p><label class="sheet-kicker">CIRCLE NAME</label><div class="fake-field">Weekend Makers' Table</div><label class="sheet-kicker">ONE-SENTENCE DESCRIPTION</label><div class="fake-field">A local group for shared meals, tools and repair skills.</div>`,
    2: `<span class="sheet-kicker">STEP 02 - MUTUAL AID</span><h3>What can this circle remember?</h3><p>Choose language that makes contribution and receiving visible without turning either into debt.</p><label class="sheet-kicker">SHARED UNIT</label><div class="fake-field">Maker marks</div><label class="sheet-kicker">FIRST REFERENCE</label><div class="fake-field">A shared repair afternoon - about 6 maker marks</div><div class="draft-card"><b>Important</b><p>References start conversations. They are not fixed prices, wages, or a score for who matters.</p></div>`,
    3: `<span class="sheet-kicker">STEP 03 - MEMBERS AND BOUNDARY</span><h3>Who can see and shape it?</h3><p>A good boundary helps people ask honestly and decline safely.</p><label class="sheet-kicker">JOINING</label><div class="fake-field">Invitation first, with a chance to read the agreement</div><label class="sheet-kicker">DEFAULT VISIBILITY</label><div class="fake-field">Inside the circle; members choose when a need or offer travels further</div><div class="draft-card"><b>Always available</b><p>Correct a record, decline a request, pause participation, or leave without penalty.</p></div>`,
    4: `<span class="sheet-kicker">STEP 04 - PREVIEW</span><h3>Weekend Makers' Table is ready to review.</h3><p>It has a named boundary, shared references, and no requirement that every kind act becomes a transaction.</p><div class="draft-card"><b>3 sample agreements</b><p>Requests are invitations. Completed mutual aid can be recorded. Care badges are recognition only and never change a balance.</p></div><div class="member-row"><button data-member="shing">${avatar('S', 'yellow', 'wave')}<b>Shing H</b><small>circle initiator</small></button><button data-member="ash">${avatar('A', 'green', 'wave')}<b>Ash</b><small>first invited member</small></button></div>`
  };
  const nextLabel = createStep === 4 ? 'Create this sample circle' : `Continue to step ${createStep + 1} &rarr;`;
  return `<section class="page-hero create-hero"><div>${pill('ANYONE CAN CREATE A CIRCLE', 'cream')}<h2>Give a real relationship<br />a clear boundary.</h2><p>A circle is an independent group of people, rules and mutual-aid records.</p></div><button data-create-step="1">Start here</button></section><div class="create-progress">${steps.map((step, index) => `<button class="${createStep === index + 1 ? 'active' : ''}" data-create-step="${index + 1}"><b>0${index + 1}</b><br />${step}</button>`).join('')}</div><section class="create-panel">${panels[createStep]}<div class="sheet-actions"><button ${createStep === 1 ? 'disabled' : ''} data-create-step="${Math.max(1, createStep - 1)}">Back</button><button class="create-primary" data-action="next-create">${nextLabel}</button></div></section>`;
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

function showProfile(memberId = selectedMemberId) {
  selectedMemberId = memberId;
  const member = members[memberId];
  const memberPosts = posts.filter((post) => post.member === memberId);
  const memberCards = posts.filter((post) => post.kind === 'card' && post.member === memberId);
  const balances = Object.entries(member.balances).map(([id, balance]) => `<span>${circleDetails[id].title}: <b>${balance}</b></span>`).join('');
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet sheet-wide"><button class="close-button" data-action="close">x</button><div class="role-card role-${member.color}">${avatar(member.letter, member.color, 'wave', false)}<div>${pill(memberId === 'shing' ? 'MY FULL PROFILE' : `MEMBER · ${member.circles.length} CIRCLES`, 'cream')}<h2>${member.name}</h2><p>${member.role} · ${member.bio}</p></div></div><div class="profile-numbers"><div><span>circles</span><b>${member.circles.length}</b></div><div><span>care badges</span><b>${memberCards.length}</b></div><div><span>active moments</span><b>${memberPosts.length}</b></div></div><section class="profile-section"><h3>How this person moves through circles</h3><p>${balances}</p></section><section class="profile-section"><h3>Visible needs, offers and care stories</h3>${memberPosts.length ? `<div class="mini-post-list">${memberPosts.map((post) => `<button data-post="${post.id}"><b>${post.badge}</b><span>${post.text}</span></button>`).join('')}</div>` : '<p>No public sample moments yet. That does not mean no care happened.</p>'}</section><div class="contact-reveal"><span>CONTACT · only shown by choice</span><b>${member.wechat}</b><button data-action="copy-contact">Copy</button></div><div class="sheet-actions"><button data-action="share">Generate share card</button><button class="confirm" data-action="close">Back to the circle</button></div></section>`;
}

function showPost(postId = selectedPostId) {
  selectedPostId = postId;
  const post = posts.find((item) => item.id === postId);
  if (!post) return;
  const circleInfo = circleDetails[post.circle];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet sheet-wide"><button class="close-button" data-action="close">x</button><div class="post-detail detail-${post.color}"><div class="post-detail-head">${avatar(post.letter, post.color, post.kind === 'mystery' ? 'bob' : 'wave')}<div>${pill(post.badge, 'cream')}<h2>${post.name}</h2><p>${post.role}</p></div></div><p class="post-detail-copy">${post.text}</p><div class="chip-row">${post.tags.map((tag) => `<span>#${tag}</span>`).join('')}</div></div><div class="detail-meta"><div><span>Circle</span><b>${circleInfo.title}</b></div><div><span>Time / place</span><b>${post.meta}</b></div><div><span>Reference</span><b>${post.reference}</b></div><div><span>Visibility</span><b>${post.visibility}</b></div><div><span>What happened</span><b>${post.detail}</b></div></div><div class="sheet-actions">${post.member ? `<button data-member="${post.member}">Open ${members[post.member].name}'s profile</button>` : '<button data-action="close">Keep it private</button>'}<button class="confirm" data-action="share">Generate share card</button></div></section>`;
}

function showCircleIntro() {
  const id = circle === 'all' ? 'wayfarers' : circle;
  const item = circleDetails[id];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet sheet-wide"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">CIRCLE INTRODUCTION</span><h2>${item.title}</h2><p>${item.intro}</p><section class="profile-section"><h3>Who this is for</h3><p>${item.location}. ${item.joining}.</p></section><section class="profile-section"><h3>What makes the boundary safe</h3><p>Requests are invitations, not claims. The circle holds a shared record of contribution and receipt; it does not create a personal debt between members.</p></section><div class="sheet-actions"><button data-action="rules">Read the rules</button><button class="confirm" data-action="members">Meet the members</button></div></section>`;
}

function showRules() {
  const id = circle === 'all' ? 'wayfarers' : circle;
  const item = circleDetails[id];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet sheet-wide"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">${item.title.toUpperCase()} · AGREEMENT</span><h2>How this circle keeps things moving</h2><div class="rule-list">${item.rules.map((rule, index) => `<div><b>0${index + 1}</b><p>${rule}</p></div>`).join('')}</div><section class="profile-section"><h3>Conversation references, not fixed prices</h3>${item.references.map(([label, value]) => `<p><b>${label}</b> · ${value}</p>`).join('')}</section><div class="sheet-actions"><button data-action="intro">Back to introduction</button><button class="confirm" data-action="close">I understand</button></div></section>`;
}

function showMembers() {
  const id = circle === 'all' ? 'wayfarers' : circle;
  const item = circleDetails[id];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet sheet-wide"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">PEOPLE · ${item.title.toUpperCase()}</span><h2>People in this sample circle</h2><p>Member profiles show only what someone chose to make visible inside this static example.</p><div class="member-list">${item.members.map((memberId, index) => { const member = members[memberId]; const offer = posts.find((post) => post.member === memberId && post.kind === 'offer'); return `<button data-member="${memberId}"><span class="member-index">0${index + 1}</span>${avatar(member.letter, member.color, 'wave', true)}<span><b>${member.name}</b><small>${member.role}</small><p>${offer ? offer.text : member.bio}</p></span><strong>${member.balances[id] ?? '—'}</strong></button>`; }).join('')}</div><button class="primary-button" data-action="invite">＋ Invite a member</button></section>`;
}

function showInvite() {
  const id = circle === 'all' ? 'wayfarers' : circle;
  const item = circleDetails[id];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">INVITE · ${item.title.toUpperCase()}</span><h2>Invite someone you know</h2><p>${item.joining}. A person sees the circle boundary before deciding whether to join.</p><div class="invite-link"><span>7 days · one-time sample invite</span><b>flowcircle.demo/join/${id}-friend</b><button data-action="copy-invite">Copy invite link</button></div><div class="invite-checklist"><b>Before someone joins, they can read:</b><span>✓ what gets recorded and who can see it</span><span>✓ the right to decline any request</span><span>✓ how to pause, correct or leave</span></div><button class="primary-button" data-action="share-invite">Share this invitation</button></section>`;
}

function showShare() {
  const cells = Array.from({ length: 49 }, (_, index) => ((index * 5 + Math.floor(index / 7) * 3) % 4) < 2);
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet share-sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">SHARE PREVIEW</span><div class="share-poster"><div class="poster-top">${avatar('S', 'yellow', 'wave')}<div><span>${members.shing.role}</span><h2>Shing's flow list</h2></div></div><div class="poster-panel poster-need"><b>I am looking for</b><p>One night in Quanzhou — a place to sleep and maybe talk.</p></div><div class="poster-panel poster-offer"><b>I can offer</b><p>Event design and one hour of consultation.</p></div><div class="poster-bottom"><div><b>You can ask. You can say no.</b><span>A circle for exchange, care and trust in motion.</span></div><div class="fake-qr">${cells.map((on) => `<i class="${on ? 'on' : ''}"></i>`).join('')}</div></div></div><button class="primary-button" data-action="copy-share">Copy share text</button></section>`;
}

function showFilterMenu() {
  const options = [['all', 'All activity', 'Needs, offers, exchanges and care badges'], ['trade', 'Completed mutual aid', 'Public and mystery records'], ['need', 'Needs', 'See who is asking'], ['offer', 'Offers', 'See what members can make room for'], ['card', 'Care badges', 'Recognition stories with no balance']];
  modal.hidden = false;
  modal.innerHTML = `<section class="sheet"><button class="close-button" data-action="close">x</button><span class="sheet-kicker">FILTER</span><h2>What would you like to see?</h2><p>Filtering only changes this view; it never changes what a record means or who can see it.</p><div class="filter-menu">${options.map(([id, title, note]) => `<button class="${activeFilter === id ? 'active' : ''} filter-${id === 'trade' ? 'blue' : id === 'need' ? 'pink' : id === 'offer' ? 'green' : id === 'card' ? 'coral' : 'yellow'}" data-filter="${id}" data-action="close"><span></span><div><b>${title}</b><small>${note}</small></div><strong>${activeFilter === id ? '✓' : '→'}</strong></button>`).join('')}</div></section>`;
}

function handleAction(action) {
  if (action === 'say' || action === 'card') { if (action === 'card') intent = 'card'; openComposer(); return; }
  if (action === 'close') { modal.hidden = true; return; }
  if (action === 'draft') { showDraft(); return; }
  if (action === 'back') { openComposer(); return; }
  if (action === 'confirm') {
    const newPost = intent === 'card'
      ? { id: `care-${Date.now()}`, member: 'shing', circle: circle === 'all' ? 'wayfarers' : circle, kind: 'card', color: 'coral', letter: 'S', name: 'Shing thanked a member', role: 'Cross-circle recognition', badge: 'Care badge', text: 'A new care story was added after the draft was checked.', tags: ['appreciation'], meta: 'just now · seen with care', detail: 'This care badge was created in the English static walkthrough. It creates no balance and asks nothing in return.', reference: 'recognition only · no balance', visibility: 'cross-circle' }
      : { id: `moment-${Date.now()}`, member: 'shing', circle: circle === 'all' ? 'wayfarers' : circle, kind: intent === 'record' ? 'trade' : intent, color: intent === 'need' ? 'pink' : intent === 'offer' ? 'green' : 'yellow', letter: 'S', name: 'Shing', role: 'Newly published sample', badge: intent === 'record' ? 'Exchange completed' : intent === 'need' ? 'I am looking for' : 'I can offer', text: intent === 'record' ? 'A checked mutual-aid record was added to the circle.' : intent === 'need' ? 'A new request is ready for the circle to see.' : 'A new offer is ready for the circle to see.', tags: ['new draft'], meta: 'just now · English static walkthrough', detail: 'This sample was created after the draft review. It can be opened, shared and viewed from the profile like the other demo moments.', reference: 'agreed in the circle', visibility: 'inside the circle' };
    posts.unshift(newPost); modal.hidden = true; activeFilter = 'all'; view = 'feed'; render(); showToast(intent === 'card' ? 'Care badge added to the passport.' : 'Draft published to the sample circle.'); return;
  }
  if (action === 'profile') { showProfile('shing'); return; }
  if (action === 'details') { showPost(selectedPostId); return; }
  if (action === 'share') { showShare(); return; }
  if (action === 'intro') { showCircleIntro(); return; }
  if (action === 'rules') { showRules(); return; }
  if (action === 'members') { showMembers(); return; }
  if (action === 'invite') { showInvite(); return; }
  if (action === 'next-create') {
    if (createStep < 4) { createStep += 1; render(); return; }
    view = 'circles'; circle = 'wayfarers'; render(); showToast('Sample circle created. Review its agreement and invite flow.'); return;
  }
  if (action === 'preview') { showInfo('New circle preview', 'Weekend Makers’ Table has a clear boundary, its own visibility rules, and a shared record for care that has already happened. You can now return to the activity view or keep shaping the circle.'); return; }
  if (action === 'copy-contact') { navigator.clipboard?.writeText(members[selectedMemberId].wechat); showToast('Contact copied.'); return; }
  if (action === 'copy-invite') { navigator.clipboard?.writeText(`https://flow-circle-demo.helloworld-zoey.chatgpt.site/demo.html#join-${circle}`); showToast('Invite link copied.'); return; }
  if (action === 'share-invite') { showToast('Invite text is ready to share.'); return; }
  if (action === 'copy-share') { navigator.clipboard?.writeText('You can ask. You can say no. Come see how exchange and care can keep moving in Flow Circle.'); showToast('Share text copied.'); return; }
  if (action === 'filter') {
    if (view !== 'feed' && view !== 'discover') { showInfo('Archive visibility', 'Profiles keep circle balances separate. Care stories and needs/offers only travel when someone chose to make them visible.'); return; }
    showFilterMenu();
    return;
  }
  if (action) showInfo('Flow Circle', 'This part of the walkthrough is ready to explore through the circle, member and activity views.');
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.member) { showProfile(target.dataset.member); return; }
  if (target.dataset.post) { showPost(target.dataset.post); return; }
  if (target.dataset.view) { view = target.dataset.view; if (view === 'discover' && !['all', 'need', 'offer'].includes(activeFilter)) activeFilter = 'all'; render(); return; }
  if (target.dataset.circle) { circle = target.dataset.circle; if (view !== 'circles' && view !== 'profile') view = 'feed'; render(); return; }
  if (target.dataset.filter) { activeFilter = target.dataset.filter; render(); return; }
  if (target.dataset.createStep) { createStep = Number(target.dataset.createStep); render(); return; }
  handleAction(target.dataset.action);
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) { modal.hidden = true; return; }
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.member) { showProfile(target.dataset.member); return; }
  if (target.dataset.post) { showPost(target.dataset.post); return; }
  if (target.dataset.filter) { activeFilter = target.dataset.filter; modal.hidden = true; render(); return; }
  if (target.dataset.intent) { updateIntent(target.dataset.intent); return; }
  handleAction(target.dataset.action);
});

render();
