Models = window.Models || {}

Models.Ship = Backbone.Model.extend({

  state: 'idle',
  defaults: {
    health: 6,
    energy: 3,
    damaged: false,
    state: 'idle'
  },
  initialize: function(options){
    this.other = options.other;
    Object.defineProperty(this,'damaged',{
      set: function(value){
        return this.set('damaged',value)
      },
      get: function(){
        return this.get('damaged')
      }
    })
    Object.defineProperty(this,'energy',{
      set: function(value){
        this.set('energy',value)
      },
      get: function(){
        return this.get('energy')
      }
    })
    Object.defineProperty(this,'health',{
      set: function(value){
        return this.set('health',value)
      },
      get: function(){
        return this.get('health')
      }
    })
    Object.defineProperty(this,'state',{
      set: function(value){
        return this.set('state',value)
      },
      get: function(){
        return this.get('state')
      }
    })

  },

  ai: function(other){
    if(this.energy == 0) {
      return 'charge'
    }
    if(other.health == 1) {
      return 'shoot'
    }
    if(this.health == 1 ){
      return 'shield'
    }
    if(this.health < 2 && this.energy > 1){
      return _.sample(['shoot','shield'])
    }
    return _.sample(['charge','shoot','shield'])

  },

  stateChange: function(){
    var other = this.other;
    this.damaged = false;

    if(other.state == 'shoot' && this.state == 'shield') {
      this.energy++
    } else if (other.state == 'shoot' && this.state != 'shield'){
      this.health--
      this.damaged = true;
    }

    if(this.state == 'shield'){
      this.energy > 0 && this.energy--
    }
    if(this.state == 'shoot'){
      this.energy > 0 && this.energy--
    }
    if(this.state == 'charge'){
      this.energy++
    }

    if( this.health < 1) {
      this.trigger('dead')
    }
  },

  valueOf: function(){
    return 'energy: ' + this.energy + ' health: ' + this.health
  }
})
