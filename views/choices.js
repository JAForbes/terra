Views.Choices = Backbone.View.extend({
  className: 'choices S',
  initialize: function(options){
    this.$el.css({ width: '500px', height: '100px'})
    var hasEnergy = function() {
      return options.model.energy > 0
    }
    var always = function() { return true }

    this.subViews = [
      this.charge = new Views.Choice({ className: 'choice W', model: options.model, bus: this, text: 'charge' , predicate: always }),
      this.shield = new Views.Choice({ className: 'choice E', model: options.model, bus: this, text: 'shield' , predicate: hasEnergy }),
      this.shoot = new Views.Choice({ className: 'choice X',model: options.model, bus: this, text: 'shoot', predicate: hasEnergy })
    ]
    _.map(this.subViews, function(view){ this.$el.append(view.el)}, this )

  }
})

Views.Choice = Backbone.View.extend({

  className: 'choice',

  initialize: function(options){
    this.el.innerText = options.text;
    this.enabled = true;
    this.$el.css({ width: 40, height: 40})
    options.model.on('change:energy', function(){
      var that = this;
      _.defer(function(){
        that.enabled = options.predicate() && models.ship1.health > 0 && models.ship2.health > 0
        if( that.enabled ){
          that.$el.removeClass( 'disabled' )
        } else {
          that.$el.addClass('disabled')
        }
      })

    },this)
    this.el.onclick = _.bind(function(){
      if( this.enabled ) {
        options.bus.trigger( 'choice', this, options.text )
      }
    },this)
  },

})
