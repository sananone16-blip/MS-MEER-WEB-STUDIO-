function sendWhatsApp(){
  let name=document.getElementById('name').value;
  let business=document.getElementById('business').value;
  let msg=document.getElementById('msg').value;
  let text=`Salam MS Meer Studio,%0AName: ${name}%0ABusiness: ${business}%0AMessage: ${msg}`;
  window.open(`https://wa.me/923410784488?text=${text}`,'_blank');
}

// Clickable star rating
let selectedRating = 0;
const stars = document.querySelectorAll('#stars .star');
const ratingText = document.getElementById('ratingText');

stars.forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(star.dataset.value));
  star.addEventListener('mouseout', () => highlightStars(selectedRating));
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    highlightStars(selectedRating);
    ratingText.textContent = selectedRating + ' / 5 Stars';
  });
});

function highlightStars(value){
  stars.forEach(star => {
    star.classList.toggle('active', star.dataset.value <= value);
  });
}

function submitReview(){
  let name = document.getElementById('reviewName').value;
  let review = document.getElementById('reviewMsg').value;
  if(selectedRating == 0){
    alert('Please select a star rating.');
    return;
  }
  if(name.trim() === '' || review.trim() === ''){
    alert('Please enter your name and review.');
    return;
  }
  let text = `Salam MS Meer Studio,%0ARating: ${selectedRating}/5%0AName: ${name}%0AReview: ${review}`;
  window.open(`https://wa.me/923410784488?text=${text}`,'_blank');

  addReview({ name: name, rating: selectedRating, text: review });

  document.getElementById('reviewName').value = '';
  document.getElementById('reviewMsg').value = '';
  selectedRating = 0;
  highlightStars(0);
  ratingText.textContent = 'Select a rating';
}

/* ===== Reviews display (shows everyone's ratings & reviews) ===== */
const defaultReviews = [
  { name: 'Bilal Khan', rating: 5, text: 'Website time pe deliver hui aur design bohat professional tha. Highly recommended!' },
  { name: 'Sana Ali', rating: 5, text: 'Mashrik Bank integration smooth thi, customers ko koi problem nahi hui.' },
  { name: 'Usman Tariq', rating: 4, text: 'Achi service, communication bhi acha tha. Thoda time zyada laga lekin result acha mila.' }
];

function loadReviews(){
  const saved = JSON.parse(localStorage.getItem('msmeer_reviews') || '[]');
  return defaultReviews.concat(saved);
}

function renderReviews(){
  const list = document.getElementById('reviewsList');
  if(!list) return;
  const reviews = loadReviews();
  list.innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">${r.text}</p>
      <p class="review-name">— ${r.name}</p>
    </div>
  `).join('');
}

function addReview(r){
  const saved = JSON.parse(localStorage.getItem('msmeer_reviews') || '[]');
  saved.push(r);
  localStorage.setItem('msmeer_reviews', JSON.stringify(saved));
  renderReviews();
}

document.addEventListener('DOMContentLoaded', renderReviews);
