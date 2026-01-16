jQuery(document).ready(function($){ 
	const shareButtons = [
		['tw', 'Twitter'],
		['fc', 'Facebook'],
		['ln', 'Linkedin'],
	]
	shareButtons.forEach((button) => {
		const [buttonClass, buttonType] = button;
		$(`a.${buttonClass}`).on('click', function(){
			window.dataLayer.push({
				'event': 'Share',
				'Type': buttonType
			})
		});
	});
	$('.table-contents li a').click(function(){
		var text = $(this).text();
		var h2 = $('h2:contains(' + text + ')');
		if($('#wpadminbar').length > 0)
			$('html, body').animate({
	        	scrollTop: h2.offset().top - $('header').height() - $('#wpadminbar').height() - parseInt(h2.css('margin-top'))
	    	});
		else 
			$('html, body').animate({
	        	scrollTop: h2.offset().top - $('header').height() - parseInt(h2.css('margin-top'))
	    	});
		return false;
	});

	$('[href*="#"]').click(function(){
    	var link = $(this).attr('href');
    	var anc = link.substr(link.indexOf('#'));
    	if($(anc).length>0){
    		if($('body').hasClass('vis_hm')){
    			$('body').removeClass('vis_hm');
    			$('html,body').animate({scrollTop:$(anc).offset().top-1.2*$('header').outerHeight()}, 400);
    		}else $('html,body').animate({scrollTop:$(anc).offset().top-3*$('header nav').outerHeight()}, 400);
    		if(anc.indexOf('form') >= 0)
    			$(anc).find('.form-group:first-child .form-control').focus();
    		return false;
    	}else return true;
    });

	$(document).on('scroll', function(){
		if(window.matchMedia('(min-width: 651px)').matches) {
			var hh = parseInt($('header').outerHeight()),
				poss = [0],
				li;

			$('.table-contents li a').each(function(indx){
  				poss.push($('h2:contains(' + $(this).text() + ')').offset().top);
			});
			
			poss.forEach(function(item, i, arr) {
  				if( 1.05*window.pageYOffset > item ) li = i;
			});

			if( li != 0 ) {
				if(!$('.table-contents li:nth-child('+li+') a').hasClass('act')){
					$('.table-contents .act').removeClass('act');
					$('.table-contents li:nth-child('+li+') a').addClass('act');
				}
			}else $('.table-contents .act').removeClass('act');
		}
    });
});

$(function () {
	const form_new = $('.subscribe-form');
	
	form_new.on('submit', function (e) {
	  e.preventDefault();
	  $(this).find('input').removeClass('error-field');
  
	  let errors = [],
		  email = $(this).find('[name="email"]');
  
	  if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email.val().replace(/(^\s*)|(\s*)$/g, ''))) {
		errors.push(email);
	  }
	  if (errors.length > 0) {
		$.each(errors, function (i) {
		  errors[i].addClass('error-field');
		});
  
		return false;
	  }
	  const data = new FormData(form_new[0]);
  
	  handleFormSubmit('//traccoon.intellectsoft.net/forms/intellectsoft/blog-subscription', data, {
		type: 'ContactForm'
	  }).then(function (res) {
		if (res.data.status) {
		  window.dataLayer.push({
			'event': 'FormSubmitB',
			'Type': 'Subscribe to updates'
		  });
		  email.val('');
		  $('.newsletter-form .success').css('display', 'block');
		}
	  })
	});
  });