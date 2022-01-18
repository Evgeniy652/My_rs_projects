console.log('1.Task:https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part1.md \n2.Deploy:https://rolling-scopes-school.github.io/evgeniy652-JSFEPRESCHOOL/portfolio/ \n3.Done 04.01.2022 / deadline 17.01.2022 \n4.Score: 110 / 110 \n5.Самооценка  работы : \n 1)[+]Вёрстка валидная +10 \n 2)[+]Вёрстка семантическая +20 \n 3)[+]Вёрстка соответствует макету +48 \n 4)[+]Требования к css + 12 \n 5)[+]Интерактивность, реализуемая через css +20');
$(document).ready(function(){
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
  });
});
