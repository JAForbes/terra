Views.Stats = Backbone.View.extend({

  initialize: function(){
    this.el.innerText = ''+this.model
    this.model.on('change', function(model){
        this.el.innerText = ''+model
    },this)
  }

})
