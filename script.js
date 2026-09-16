// Remove the unused music controls from the page.
document.querySelector('.song-card')?.remove();
document.getElementById('musicFab')?.remove();

// ---------- Falling petals ----------
(function(){
  const field = document.getElementById('petal-field');
  const colors = ['#cf94c9', '#b06bb8', '#e9c3dd', '#95579f'];
  const petalCount = window.innerWidth < 640 ? 16 : 26;

  function makePetal(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 10 + Math.random() * 12;
    const left = Math.random() * 100;
    const fallDuration = 9 + Math.random() * 9;
    const swayDuration = 3 + Math.random() * 3;
    const delay = Math.random() * 12;
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.left = left + 'vw';
    petal.style.animationDuration = fallDuration + 's, ' + swayDuration + 's';
    petal.style.animationDelay = '-' + delay + 's, -' + (Math.random() * swayDuration) + 's';

    petal.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24">' +
      '<path fill="' + color + '" d="M12 2C7 2 4 7 4 12c0 5 3.5 10 8 10s8-5 8-10c0-5-3-10-8-10z" opacity="0.9"/>' +
      '</svg>';
    return petal;
  }

  for(let i = 0; i < petalCount; i++){
    field.appendChild(makePetal());
  }
})();

// ---------- Photo: auto-loads photo.jpg from the same folder ----------
(function(){
  const input = document.getElementById('photo-input');
  const img = document.getElementById('photoImg');
  const placeholder = document.getElementById('photoPlaceholder');
  const changeBtn = document.getElementById('changePhotoBtn');

  function showImage(src){
    img.src = src;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    changeBtn.style.display = 'inline-block';
  }

  function showPlaceholder(){
    img.style.display = 'none';
    placeholder.style.display = 'block';
    changeBtn.style.display = 'none';
  }

  // photo.jpg sitting next to this file loads automatically on open
  img.addEventListener('load', function(){ showImage(img.src); });
  img.addEventListener('error', showPlaceholder);
  if(img.complete && img.naturalWidth > 0){ showImage(img.src); }

  // manual picker still works, and overrides photo.jpg for this visit
  input.addEventListener('change', function(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(ev){ showImage(ev.target.result); };
    reader.readAsDataURL(file);
  });

  changeBtn.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    input.click();
  });

  document.getElementById('photoSlot').addEventListener('click', function(e){
    if(img.style.display === 'block'){
      // already showing a photo: clicking the frame itself does nothing,
      // use the "change photo" button instead
      e.preventDefault();
    }
  });
})();
