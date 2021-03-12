(function() {
    toggleGnb();

    function toggleGnb() {
        var el = $('#header .gnb_wrap, body');
        var gnbBg = $('#header .gnb_bg');

        // 메뉴 열기
        $('#header .btn_menu').on('click', function() {
            // console.log('클릭됨');
            el.addClass('on');
            gnbBg.fadeIn();
        });

        // 메뉴 닫기, gnb초기화
        $('#header .btn_close').on('click', function() {
            el.removeClass('on');
            gnbBg.fadeOut();

            $('#header .gnb>li').removeClass('on');
            setTimeout(function() {
                $('#header .gnb .depth2').slideUp();
            },500);
        });

        // gnb배경 클릭시 메뉴닫기
        $('#header .gnb_bg').on('click', function() {
            $('#header .btn_close').trigger('click');
        });
    
        // gnb 아코디언
        // 클릭한 메뉴만 열기
        $('#header .gnb>li>a').on('click',function() {
            // li에 on처리시
            // $(this).parent().toggleClass('on').siblings().removeClass('on');
    
            $(this).parent().toggleClass('on').siblings().removeClass('on').find('.depth2').slideUp();
            // 클릭한 a의 부모 li를 열고 다른 형제 li안쪽의 depth2는 닫기(쌤 다시 확인)
            // $(this).siblings('.depth2').stop().slideToggle().parent().siblings().find('.depth2').slideUp();
    
            // a에 on처리시
            // $(this).toggleClass('on').parent().siblings().find('a').removeClass('on');
    
            $(this).siblings('.depth2').stop().slideToggle();
        });
        
        // 서브메뉴 모션후 링크(일반적인 기능은 아님)
        $('#header .gnb .depth2 a').on('click', function(e) {
            // 기존 herf 이동을 막아준뒤 setTimeout적용시키기위해
            e.preventDefault();
            $(this).addClass('on');
            // console.log($(this).attr('href'));

            var url = $(this).attr('href');
            
            // 0.5초 뒤에 이동
            setTimeout(function() {
                // href값으로 강제이동
                location.href = url;
            },500);
        });
    }

    // 클릭한 메뉴 모두 열고닫기
    // $('#header .gnb>li>a').on('click',function() {
    //     // console.log('클릭');
    //     $(this).toggleClass('on');
    //     $(this).siblings('.depth2').stop().slideToggle();
    // });




    // 메인 슬라이더
    var mainSlider = new Swiper('.main_slider', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 메인 탭메뉴 슬라이더
    var menuSlider = new Swiper('.menu_slider', {
        // 슬라이드의 내용에 맞게 높이 자동 조절
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });

    // 메인 탭메뉴
    $('.main_menu .tab_menu>li').on('click', function(e) {
        e.preventDefault();
        var idx = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        console.log(idx);

        $('.menu_slider_wrap .menu_slider_blind').eq(idx).addClass('active').siblings().removeClass('active');

    });


    // 서브페이지

    // 서브 lnb 공통
    // 클릭시마다 이전동작 멈추게함
    // $('.lnb .btn_lnb').on('click', function() {
    //     $(this).toggleClass('active');
    //     $('.lnb .list_lnb').stop().slideToggle();
    // });

    var flag = true;
    // btn_lnb에 active가 없으면 리스트 열고 있으면 닫기 (한번씩 열렸다 닫혔다 조건 처리)
    // 클릭시마다 flag를 false시키고 slideToggle후 flag를 true로 변경하여 flag가 true일때만 코드실행시킴
    $('.lnb .btn_lnb').on('click', function () {
        if(flag) {
            $(this).toggleClass('active');
            $('.lnb .list_lnb').slideToggle(1000, function() {
                flag = true;
            });
        }
        flag = false;
    });
})();