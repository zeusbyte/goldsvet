$(document).ready(function(){

	$('.slidershow > #basic').sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			scrollBar: $('.slidershow').find('.scrollbar'),
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 0,
      activateMiddle: true,
      cycleBy: 'items',
      cycleInterval: 2500
		});

  $('.grid-game').each(function(){
    let sv = 0;
    $(this).find('div').each(function(){
      let s = $(this);
      setTimeout(function(){
        s.animate({
          opacity: 0.95,
        }, 100, function(){
          s.addClass('finish-anim');
        });
      }, (sv > 4000 ? 4000 : sv));
      sv += 80;
    });
  });

  $('.grid-game').each(function(){
    let sv = null;
    let gl = $(this);
    $(this).find('div').mouseenter(function(){
      if(!$(this).hasClass('finish-anim')) return false;
      if(sv != null){
        clearTimeout(sv);
        sv = null;
      }
      $(this).parent().find('div.finish-anim').css('opacity', '0.85');
      $(this).css('opacity', '1');
    });

    $(this).find('div').mouseleave(function(){
      if(!$(this).hasClass('finish-anim')) return false;
      sv = setTimeout(function(){
        gl.find('div.finish-anim').css('opacity', '0.95');
      }, 100);
    });

  });

	feather.replace()

	$('.tggle-menu').off('click').click(function(){
    tggleMenu($(this).data('action'));
  });

	runAutomaticJackpotsScroll(0, 1);

	$('.search-bar').find('input[type="text"][name="search_key"]').off('keyup').on('keyup', function(){
    runSearch($(this).val());
  });

  $('.search_showing').off('click').click(function(){
    showSearch();
  });

  $('.search_hidding').off('click').click(function(){
    hideSearch();
  });

});

function tggleMenu(action){

  if(action == "show"){
    $('.menu-mobile .leftmenu').addClass('visible');
  } else {
    $('.menu-mobile .leftmenu').removeClass('visible');
  }

}

function runAutomaticJackpotsScroll(x, dir){

  let newOffset = x + dir;
  let change = false;
  if(dir == 1 && newOffset > ($('.jackpots-listing').width() * 0.9)){
    newOffset = ($('.jackpots-listing').width() * 0.9) - 1;
    dir = -1;
  }

  if(dir == -1 && newOffset < 0){
    newOffset = 0;
    dir = 1;
    change = true;
  }
  $('.jackpots-listing').scrollLeft( newOffset );

  setTimeout(function(){
    runAutomaticJackpotsScroll(newOffset, dir);
  }, (change ? 1000 : 25));

}



let sv = null;

function showSearch(){
  $('.search-bar').removeClass('hidden');
  runSearch($('.search-bar').find('input[type="text"][name="search_key"]').val());
}

function hideSearch(){
  $('.search-bar').addClass('hidden');
}

function runSearch(search_key){

  if(sv != null){
    sv.abort();
  }

  sv = $.post('/search_game', {'search_key': search_key}).done(function(data){

    $('.search_result').html('');

    data = JSON.parse(data);
    data.games.map(function(game){
      console.error(game);

/*       let gameItem = `
      <li>
        <a href="/game/` + game.name + `">
          <div class="infos">
            //<img src="https://eyecu-games-pictures.b-cdn.net/games/` + game.name + `.jpg" alt="">
			<img src="https://eyecu-games-pictures.b-cdn.net/games/` + game.name + `.jpg" alt="">
            <div>
              <label>` + game.title + `</label>
              <span class="tag tag-small tag-green">New</span>
            </div>
          </div>
          <div class="icons">
            <i data-feather="chevron-right"></i>
          </div>
        </a>
      </li>
      `; */

      $('.search_result').append(gameItem);

      	feather.replace()
    });

  });
}
