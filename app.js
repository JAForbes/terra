_.mixin({
	cycle: function(divsior){
		return ((Math.sin(_.now()/divsior)+1.5)/2)
	}
})
models = {}
views = {}
views.world = new Views.World()

$('body').append(views.world.el)

var i = 0;
music.volume = 0.005

charge1.volume = 0.5;
charge2.volume = 0.5;
shoot1.volume = 0.5;
shoot2.volume = 0.5;
shield.volume = 0.5;
damage.volume = 0.05

music.play()



$('.world').append('<h1>Terra</h1>')

localStorage.setItem('losses', localStorage.getItem('losses') || 0 )
localStorage.setItem('wins', localStorage.getItem('wins') || 0 )
