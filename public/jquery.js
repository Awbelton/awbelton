$( document ).ready(function() {
  $('.loginform').hide();
  $('.suform').hide();
  $('.login').click(function(ev){
    $('.suform').hide('slow');
    $('.loginform').toggle('slow');
  });
  $('.signup').click(function(ev) {
    $('.loginform').hide('slow');
    $('.suform').toggle('slow');
  });
  $('.hide-link').click(function(ev) {
    $('.about-me').fadeToggle(400, 'linear');
    $('.my-skills').fadeToggle(400, 'linear');
    var $this = $(this);
    $this.toggleClass('hide-link');
    if($this.hasClass('hide-link')) {
      $this.text('hide');
    } else {
      $this.addClass('show-link');
      $this.text('show');
    };
  });

  // post page
  $('.make-post-div').hide();
  $('.post-list').hide();
  $('.update-portfolio-div').hide();

  $('.make-post').click(function(ev) {
    $('.make-post-div').toggle(400);
    $('.post-list').hide();
    $('.update-portfolio-div').hide();
  });

  $('.view-posts').click(function(ev) {
    $('.post-list').toggle(400);
    $('.make-post-div').hide();
    $('.update-portfolio-div').hide();
  });

  $('.update-portfolio').click(function(ev) {
    $('.update-portfolio-div').toggle(400);
    $('.make-post-div').hide();
    $('.post-list').hide();
  });
});
