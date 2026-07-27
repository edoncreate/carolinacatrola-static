/**
 * Infinizy Load More
 *
 * Version: 1.0.1
 * Author: Tushar Gohel
 * Website: https://infinizy.net
 *
 */
(function($) {
	$.fn.InfinizyLoadMore = function( options ) {

		var page = 1;

		var data = {
			'action': 'cpt_alm_loadmore',
		};

		var settings = {};
		var isAjax = false;
		var found_posts = 0;
		var $this = $(this);
		var $aa = this;
		var $btn = $this.find('.cpt-alm-btn-load-more');
		var $wrapper = $this.find('.cpt-alm-wrapper');
		var $loader = $this.find('.cpt-alm-loader');
		var $offset = 0;
		var $complete = 0;
		var $paged = 2;
		var $last_scroll = 0;
		var $is_scroll_complete = true;
		 // public methods 
        this.initialize = function() {

        	settings = $aa.getDataAttributes($wrapper[0]);
        	var elem = document.querySelector('#'+settings.id);
			$aa.bindCustomEvent(elem,'cpt_alm_init',settings);
        	found_posts = parseInt(settings.found_posts);
        	$offset = parseInt(settings.init_load) + parseInt(settings.offset);
        	if(settings.scroll == 'true'){
        		this.bindScrollEvent();
        	}else{
            	this.bindButtonEvent();
        	}
        };

        this.bindButtonEvent = function(){
        	$btn.on('click', function(e) {
        		var $a = this;
			    e.preventDefault();
			    $aa.loadMoreData($a);
		    });
        }

        this.bindCustomEvent = function(a,name,data){
        	cpt_ala_params[name] = new CustomEvent(name, {
	    		bubbles: true, detail: data
	    	});
			a.dispatchEvent(cpt_ala_params[name]);
        }

        this.onScroll = function(){
        	var t = $wrapper.offset().top + $wrapper.outerHeight() - window.innerHeight;
	    		if ($(window).scrollTop() >= $wrapper.offset().top + $wrapper.outerHeight() - window.innerHeight) { 
	    		if($complete){ return; }
	    		var $a = this;
	    		if($is_scroll_complete){
	            	$aa.loadMoreData($a,true);
	    		}
    		}
        }

        this.bindScrollEvent = function(){
        	$btn.hide();	
        	window.addEventListener('scroll', this.onScroll, false);
        }

        this.toggleLoader = function(show){
        	if(show){
        		$loader.show();
        		$loader.addClass('loading-'+settings.loading_style);
        	}else{
        		$loader.hide();
        		$loader.removeClass('loading-'+settings.loading_style);
        	}
        }

        this.toggleButton = function(show){
        	if(settings.scroll != 'true'){
	        	if(show){
	        		$btn.show();
	        	}else{
	        		$btn.hide();
	        	}
	        }
        }

        this.loadMoreData = function($a,$isScroll = false){
        	if(isAjax){return;}

        	data.cpt_alm_nonce = cpt_ala_params.nonce;
			$.ajax({ 
				url : cpt_ala_params.ajaxurl+"?paged="+$paged,
				data : data,
				dataType : 'json',
				type : 'GET',
				beforeSend : function ( xhr ) {
					isAjax = true;
					$aa.toggleButton(0);
					$aa.toggleLoader(1);
					$aa.bindCustomEvent($a,'cpt_alm_before_loadmore',{ id: settings.unique_id });
				},
				success : function( data ){
        	 	
					if($isScroll){
        	 			window.removeEventListener('scroll', this.onScroll, false);
						$is_scroll_complete = false;						
					}

					$aa.toggleLoader(0);
					isAjax = false;
					if( data.status == 'ok' ) {
						$paged++;
						$wrapper.append(data.html);
						if($isScroll){
    	 					setTimeout(function(){ 
	    	 					$is_scroll_complete = true;
	    	 					window.addEventListener('scroll', this.onScroll, false);
	    	 				}, 500);
    	 				}
						if(parseInt(settings.offset) + parseInt(settings.posts_per_page) >= found_posts){
							
							$aa.toggleButton(0);
							$complete = 1;
							$aa.bindCustomEvent($a,'cpt_alm_finish',{ id: settings.unique_id});

						}else{
							$aa.toggleButton(1);
						}
					} else {
						$aa.toggleButton(0);
					}

					settings.offset = parseInt(settings.offset) + parseInt(settings.posts_per_page);
			    	$aa.bindCustomEvent($a,'cpt_alm_after_loadmore',{ id: settings.unique_id, status : data.status });
				},
				error: function (error) {
					if(error.responseText == 'Invalid Token')
						alert(error.responseText);

					$is_scroll_complete = true;
					$aa.toggleLoader(0);
					$aa.toggleButton(1);
					isAjax = false;
			    	$aa.bindCustomEvent($a,'cpt_alm_error',{ id: settings.unique_id, error : error });

				}
			});        	
        }

        this.getDataAttributes = function(el){
			[].forEach.call(el.attributes, function(attr) {	
				if (/^data-/.test(attr.name)) {
				    var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
				        return '_'+	$1;
				    });

				    camelCaseName = camelCaseName.replace(/-(.)/g, function ($0, $1) {
				        return '_'+	$1;
				    });

				    data[camelCaseName] = attr.value;
				}
		    });
    		return data;
        }
		return this.initialize();
	}

	if($('.cpt-alm-main').length > 0){

		$( ".cpt-alm-main" ).each(function( index,element ) {
			var id = $(this).attr('id');
			if($('#'+id).length < 2 && $('#'+id).length > 0){
				$('#'+id).InfinizyLoadMore();
			}else{
				alert('you are using single id for instance of ajax load more, please make unique.');
			}
		});
	}
	
}( jQuery ));