var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');



function openCreatePostModal() {
  createPostArea.style.display = 'block';
  
  // install PWA
  // if (deferredPrompt){
  //   deferredPrompt.prompt();
  //   deferredPrompt.userChoice
  //   .then( function (result) {
  //     console.log(result.outcome);
  //
  //     if (result.outcome === 'dismissed'){
  //       console.log('user says fuck you');
  //     } else{
  //       console.log('yay another victim >:D ');
  //     }
  //     deferredPrompt = null;
  //   })
  // }
  
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);


// unregister service worker
// const uninstallBtn = document.querySelectorAll('.uninstall');
// uninstallBtn.forEach(x=>{
//   x.addEventListener('click', (evt) => {
//       unisntall(evt)
//     });
// })

// function unisntall(evt) {
//     evt.preventDefault();
//     console.log('Uninstalling...');
//     // unregister Service Wroker ***********
//     navigator.serviceWorker.getRegistrations().then(function (registrations) {
//       for (let registration of registrations) {
//         registration.unregister()
//       }
//     });
//     // ****************** *******************
// }

//https://rickandmortyapi.com/api
// ~(async (url)=>{
//     const response = await fetch(url);
//     const result = await response.json();
//     console.log(result);
// })('https://rickandmortyapi.com/api');
