Views.End = Backbone.View.extend({
  className: 'end X',

  initialize: function(){
    this.$el.css({ width: '400', height: '400', textAlign: 'center'})
  },

  render: function(message){

    var retry = 'Try Again?'
    var wins = localStorage.getItem('wins')*1
    var losses = localStorage.getItem('losses')*1
    var total = wins+losses;
    var winRatio = wins/total

    var statistics = "Win Ratio: "+winRatio.toFixed('2')+'%'

    this.el.innerHTML = [
    '<p>',message,'</p>',
    '<p>',statistics,'</p>',
    '<p class="retry">Try Again?</p>',
    ].join('')

    var el = this.el;
    this.$('.retry').one('click',function(){
      models.ship1.set( Models.Ship.prototype.defaults )
      models.ship2.set( Models.Ship.prototype.defaults )

      el.innerText = ''
    })
  }

})
