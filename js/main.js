// $(function () {
//   alert('안녕');
// })

'use strict';
//getBoundingClientRect()부분이 자꾸 오류남
// Mame navbar transparent when it is on the top
const nav = document.querySelector('#navbar');
const navbarHeight = nav.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  //console.log(window.scrollY);
  //console.log(`navbarHeight: ${navbarHeight}`);
  if(window.scrollY > navbarHeight) {
    // navbarHeight이상으로 스크롤이 발생하면,
    nav.classList.add('navbar--dark');
  } 
  else {
    nav.classList.remove('navbar--dark');
  }
});
/* 어느정도로 스크롤링이 되었을 때  navbar에 배경색을 주고 싶으므로, 
스크롤링이 어느정도 되는지 수치를 알아야 함. */

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  //타겟은 이벤트(클릭)가 일어나는 그 것.
  const link = target.dataset.link;
  //html의 li요소에 data-link="#id이름" 을 주고 호출한다.
  if(link === null) {
    return;
  }
  navbarMenu.classList.remove('open'); 
  // 모바일크기에서 토글버튼 누르고 메뉴를 클릭해서 스크롤링 됐을 때
  //메뉴는 닫히도록 함 

  //console.log(event.target.dataset.link);
  //콘솔에 현재 클릭한 타켓의 data-link의 요소를 보여준다.
  scrollIntoView(link);
});

//Navbar toggle button for Mobile
const navbarToogleBtn = document.querySelector('.navbar__toggle-btn');
navbarToogleBtn.addEventListener('click', ()=> {
  navbarMenu.classList.toggle('open');
})


const homeContactMe = document.querySelector('.home__contact');
homeContactMe.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// 윈도우 스크롤다운되면 home부분이 점차 투명해짐
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
  //console.log(homeHeight);
  //console.log(1 - window.scrollY / homeHeight);
  // homeHeight이 800이면, 스크롤링이 0이다. 
  //스크롤링이 400이면 0.5이다. 를 증명하는 console

  home.style.opacity = 1- window.scrollY / homeHeight;
  //home에 있는 container안에 있는 요소들만 투명하게 만듬. 
  //home의 백그라운드에 배경이 있으므로 배경은 투명해지지 않음.
})

// show "arrow-up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY> homeHeight /2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

  // Handle click on the "arrow up" button
  arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
  });

  // projects buttoin
  const workBtnContainer = document.querySelector('.work___categories');
  const projectContainer = document.querySelector('.work__projects');
  const projects = document.querySelectorAll('.project');
  workBtnContainer.addEventListener('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    // button을 각각 눌렀을 때 data-filter값을 불러온다
    //숫자를 누르면 span태그여서 데이터가 불러와지지 않아서, 
    //그 부모값의 data-filter값을 불러오도록함.
    if(filter ==null) {
      return;
    } //만약, filter 값이 없다면 아무것도 return하지 말아라

    // remove selection from the previous item and selection active
    const active = document.querySelector('.cartegory___btn.selected');
    active.classList.remove('selected');
    const target = 
    e.target.nodeName ==='BUTTON' ? e.target : e.target.parentNode; 
    target.classList.add('selected');
    // active된 button만 selected로 꾸며지도록 함.
    
    projectContainer.classList.add('ani-out');
  //프로젝트가 클릭했을 때 슬며서 니타나며 크기가 달라지는 set
  setTimeout(() => {
    projectContainer.classList.remove('ani-out');
  }, 300);
  // 버튼을 눌렀을 때 작아졌다가 커지며 해당 프로젝트면 나타난다.
    projects.forEach((project) => {
      // forEach는 for문으로 돌리는 것과 같다.
      //console.log(project.dataset.type);
      if(filter==='*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
        // 버튼을 클릭했을 때만 안 보여지게 
      } else {
        project.classList.add('invisible');
        // click했을 때 dataset의 type이 해당하는 것만 보여줌.
      }
    });
  });


  function scrollIntoView(selector) {
    // 이 부분이 계속 겹치기 때문에 하나의 함수로 만들어주고 위의 코드를 단순화
    const scrollTo = document.querySelector(selector);
    // link부분은 id를 넣거나 이미 선언된 변수 이름을 넣기.
    scrollTo.scrollIntoView({behavior:'smooth'});
    //링크가 걸린 그 부분으로 스크롤을 이동한다.
  };
  