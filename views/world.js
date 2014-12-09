Views.World = Backbone.View.extend({
  className: 'world',
  initialize: function(){

    models.ship1 = new Models.Ship({ name: 'ship1' })
    models.ship2 = new Models.Ship({ name: 'ship2' });
    models.ship1.other = models.ship2
    models.ship2.other = models.ship1
    views.ship2 = new Views.Ship({
      model : models.ship2 , className: 'NE',
      sounds: {
        charge: charge2,
        shoot: shoot2,
        shield: shield
      }
    }).on('imagesLoaded',this.allImagesLoaded,this)
    views.ship1 = new Views.Ship({
      model : models.ship1 , className: 'SW',
      sounds: {
        charge: charge1,
        shoot: shoot1,
        shield: shield
      }
    }).on('imagesLoaded',this.allImagesLoaded,this)
    this.$el.append( views.ship1.el )
    this.$el.append( views.ship2.el )

    models.ship1.on('change:damaged',function(ship,damaged){

      if(damaged) {
        //flash the screen
        $('body').css({background: 'white'})
        _.delay( function(){$('body').css({background: '' })},100 )
      }
    })

    views.choices = new Views.Choices({ model: models.ship1 })

    //~game loop
    views.choices.on('choice',function(choice,text){

      models.ship1.attributes.state = 'idle'
      models.ship1.set('state',text)

      models.ship2.state = models.ship2.ai(models.ship1)
      models.ship1.stateChange()
      models.ship2.stateChange()

      views.ship1.render()
      views.ship2.render()





    })

    views.end = new Views.End()
    this.$el.append(views.end.el)

    this.$el.css({
      width: window.innerWidth,
      height: window.innerHeight,
      position: 'absolute'
    })


    models.ship1.on('dead', function(){
      localStorage.setItem('losses', (localStorage.getItem('losses')*1)+1 )

      views.end.render('Computer Wins!')
      lose.play()
    })
    models.ship2.on('dead', function(){
      localStorage.setItem('wins', (localStorage.getItem('wins')*1)+1 )
      views.end.render('You Win!')
      win.play()

    })
    this.$el.append(views.choices.el)

  },

  allImagesLoaded: _.after(numberOfShips = 2,function(){
    this.render()
  }),

  render: function(){
    models.ship1.set('state','idle')
    models.ship2.set('state','idle')

    //todo move somewhere else
    var stats = new Views.Stats({model: models.ship1})
    this.$el.append(stats.el)
    $(stats.el).addClass('SW').css({ width: views.ship1.el.width , 'textAlign': 'center' , height: '100px' })

    var stats = new Views.Stats({model: models.ship2})
    this.$el.append(stats.el)
    $(stats.el).addClass('NE').css({ width: views.ship1.el.width , 'textAlign': 'center', height: '100px'})
  }
})
