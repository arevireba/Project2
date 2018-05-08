$(document).ready(function(e){
  var $compForm = $('#computer-form');

  $compForm.on("submit", function(e){
    e.preventDefault();
    var $this = $(this);
    var values = [];

    $this.find('select').each(function(i, item){
      values.push(item.value);
    });

    $.post('/api/computer', {scores:values}).done(function(res){
      var id = res.id;
      console.log(id);
      window.location.replace('/results/' + id);
    });
  });
});