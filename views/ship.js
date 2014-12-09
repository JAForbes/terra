Views = window.Views || {}
Views.Ship = Backbone.View.extend({

  tagName: 'canvas',

  initialize: function(options){
    this.loadImages()



    this.shakes = 0;
    this.model.on('change:damaged', function(model){
      if( model.damaged ) { this.shakes = 70 }
    },this)
    this.on('imagesLoaded',function(){ this.render() },this)

    this.model.on('change:state', function(model,state){
      var snd = options.sounds[state]

      if(snd){
        snd.play()
      }
    })

    this.model.on('change:damaged', function(model,damaged){
      if(damaged){
        damage.play()
      }
    })
  },

  update: function(i){


    if( this.shakes > 0  && i % 1 == 0){
      this.shake()
      this.shakes--;
    } else {
      this.render([0,_.cycle(400)*40])
    }
  },

  loadImages: function(){

    var images = ['idle','shoot','shield','charge','damage'];

    imagesLoaded = _.after(images.length, _.bind(this.trigger,this,'imagesLoaded') )

    this.images = _.reduce( images, function( images, name){
      images[name] = new Image()
      images[name].onload = imagesLoaded
      images[name].src = ['img',this.model.get('name'),name+'.png'].join('/')
      return images;
    }, {}, this)


  },

  shake: function(){
    var translations = [
      [-7,0],
      [7,0],
      [0,-7],
      [0,7],
    ];

    var translation = translations[ this.shakes % translations.length ]
    this.render(translation)
  },


  render: function(translation){
    var con = this.el.getContext('2d')
    var ship = this.model;
    var state = ship.state;
    this.el.width = this.images.idle.width/4
    this.el.height = this.images.idle.height/4
    con.scale(0.25,0.25)

    if(translation){
      con.save()
      con.translate.apply(con,translation)
    }

    if( state == 'idle' ){
      con.drawImage(this.images.idle,0,0 )
    } else if ( state == 'shield' ) {
      con.drawImage( this.images.idle,0,0 )
      con.drawImage( this.images.shield,0,0 )
    } else if ( state == 'charge' ) {
      con.drawImage( this.images.idle,0,0 )
      con.drawImage( this.images.charge,0,0 )
    } else if ( state == 'shoot') {
      con.drawImage( this.images.idle,0,0 )
      con.drawImage( this.images.shoot,0,0 )
    }
    if ( ship.damaged ) {
      con.drawImage( this.images.damage,0,0 )
    }
    if(translation){
      con.restore()
    }
  }

})
