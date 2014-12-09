Models.World = Backbone.Model.extend({
  initialize: function(){

    this.human = new Models.Ship()
    this.computer = new Models.Ship()

    this.human.other = this.computer
    this.computer.other = this.human

    this.human.on('change:state',function(model,move){

      var otherMove = this.ai(this.human,this.computer)
      var state = move+otherMove
      this.plays[state](this.human,this.computer)
      console.log(state,this.human.toJSON(), this.computer.toJSON())
      if(this.human.health < 1) { console.log('computer wins!') }
      if(this.computer.health < 1) { console.log('human wins!') }

    },this)

  },

})
