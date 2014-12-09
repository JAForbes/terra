plays = {
	CC: function(A,B){ 
        //both charge
		A.energy++
		B.energy++
	},
	CS: function(A,B){ 
		A.energy++
        //wastes energy on shield if has energy to waste
		B.energy > 0 && B.energy--
	},
	CF: function(A,B){ 
        //B can shoot then A loses health and B loses ammo
		if( B.energy > 0 ){
          A.energy++
          A.health-- //A charges, but it took damage
 		  B.energy--
        } else {
          A.energy++ //if B couldn't shoot, A just charges like a CC
        }
        
	},
	SC: function(A,B){ 
        plays.CS(B,A)
	},
	SS: function(A,B){ 
        //if they have the energy to waste, they waste it on a shield
		A.energy > 0 && A.energy--
		B.energy > 0 && B.energy--
	},
	SF: function(A,B){ 
        //If A has a shield, and B fires B wasted energy, A absorbs energy from hit
        if( A.energy > 0 && B.energy > 0) {
          B.energy--
        } else if ( A.energy >0 ){ // if B can't shoot, A just spends energy on a shield
          A.energy--
        } else if ( B.energy >0 ){ //if A has no shield, A takes damage
          A.health--
        }
		
	},
	FC: function(A,B){ 
		plays.CF(B,A)
	},
	FS: function(A,B){ 
		plays.SF(B,A)
	},
	FF: function(A,B){ 
        //if A can shoot, B takes a hit
        if( A.energy> 0) {
          B.health--
          A.energy--
        }
        //if B can shoot, A takes a hit
        if (B.energy > 0) {
  		  A.health--
          B.energy--
        }

		
	}
}

states = _.keys(plays)

a = { energy: 3, health: 6}
b = { energy: 3, health: 6}

ai = function(other,me){
  if(me.energy == 0) {
    return 'C'
  }
  if(me.health == 1 ){
    return 'S'
  }
  if(other.health == 1) {
    return 'F'
  }
  return _.sample(['C','F','S'])
}

turn = function(){
  var state = _.sample(states)
  console.log('State: '+state)
  plays[state](a,b)
}

play = function(move){
  var otherMove = ai(a,b)
  var state = move+otherMove
  console.log('State: '+state)
  plays[state](a,b)
}


play('F'); console.log(a,b)
if(a.health < 1) { console.log('B wins!') }
if(b.health < 1) { console.log('A wins!') }