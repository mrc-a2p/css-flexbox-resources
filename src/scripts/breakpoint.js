
//<link id="size-stylesheet" rel="stylesheet" type="text/css" href="narrow.css" />

// Then we can use that as a hook and change the href value of the stylesheet. The ////// browser will see that change and unapply the old CSS and reapply the newly linked //// CSS. We'll run our little adjustment test once right away, and then anytime the ////// window is resized thereafter.
// $grid__bp-xs: 320px;
// $grid__bp-sm: 576px;
// $grid__bp-md: 768px;
// $grid__bp-lg: 1024px;
// $grid__bp-xl: 1280px;

function adjustStyle(width) {
    width = parseInt(width);
    if (width < 321) {
      // $("#size-stylesheet").attr("href", "css/narrow.css");
      document.querySelectorAll("#size-stylesheet").attr("href", "bp-mobile.css");

    } else if (width < 992) {
      // $("#size-stylesheet").attr("href", "css/medium.css");
      document.querySelectorAll("#size-stylesheet").attr("href", "bp-tablet.css");
    } else {
      //  $("#size-stylesheet").attr("href", "css/wide.css");
      document.querySelectorAll("#size-stylesheet").attr("href", "bp-desktop.css"); 
    }
  }
  
  $(function() {
    adjustStyle($(this).width());
    $(window).resize(function() 
    {
      adjustStyle($(this).width());
    });
  });