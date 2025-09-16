const trendingCards = document.querySelectorAll('.card.trending');
let index = 0;
if(trendingCards.length > 0){
  trendingCards.forEach((c,i)=> c.style.display=(i===0?'block':'none'));
  setInterval(()=>{
    trendingCards.forEach(c=> c.style.display='none');
    trendingCards[index].style.display = 'block';
    index = (index+1) % trendingCards.length;
  },3000);
}
