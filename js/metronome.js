var metro = (function($) {
  var $speed        = $('#speed')
    , $currentSpeed = $('#currentSpeed')
    , speed
    , metronome = null;

  $speed.change(function() {
    $currentSpeed.html(this.value);
    speed = Number(this.value);
    if (metronome) {
      stopMetronome();
      runMetronome();
    }
  });

  function runMetronome() {
    var ac  = new webkitAudioContext()
      , bpm = (1 / speed) * 60000
    
    metronome = setInterval(function() {
      var osc = ac.createOscillator()
      osc.connect(ac.destination);
      osc.start(0);
      osc.stop(ac.currentTime + 0.2);
    }, bpm);
  }

  function stopMetronome() {
    clearTimeout(metronome);
    metronome = null;
  }
  return {
    run: runMetronome,
    stop: stopMetronome
  }
})(jQuery);
