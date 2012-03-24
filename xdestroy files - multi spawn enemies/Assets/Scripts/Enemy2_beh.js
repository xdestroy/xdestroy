#pragma strict

public static var enemySpeed:float = 10; // speed variable for character
private var maxDamage:int = 1; // max health for enemy2
private var currentDamage:int; // enemy2 current health
private var playerReference:GameObject;
private var movementVector:Vector3;

function ChangeSpeed(inSpeed:float)
{
	enemySpeed = inSpeed; // used to change the enemy speed
}

function Awake()
{
	playerReference = GameObject.Find("Player"); // find object 'player'

}

function Update() 
{
	if(GameObject.Find("Player") != null) // if player alive follow
	{
		UpdateMovement();
	}
		else
	{
	}
}

function OnTriggerEnter(collision : Collider)
{
 switch(collision.gameObject.name)
	{
	case "Wall":
		WallCollide(); // if enemy hits wall run wallcollide function
	break;
	case "Lazer(Clone)":
		if(currentDamage == maxDamage)
		{
			Destroy (gameObject); // if bullet collide with enemy destroy enemy
			Lazer_beh.score = Lazer_beh.score + 5; // if bullet collide with enemy add one to score
		}
		else
		{
			currentDamage++; // currentDamage = itself + 1
		}
	break;
	default:

	break;
	}
}

function WallCollide()
{ //if hits wall transform enemy to other side of level
	var v:Vector3 = this.rigidbody.position;

	if(v.x >= 19)
	{
		this.transform.position = Vector3(-19,0,v.z);
	}

	else if(v.x <= -19)
	{
		this.transform.position = Vector3(19,0,v.z); 
	}

	 else if(v.z >= 19)
	 {
		this.transform.position = Vector3(v.x,0,-19);
	 }

	else if(v.z <= -19)
	{
		this.transform.position = Vector3(v.x,0,19);
	}
}
/*
function UpdateMovement()
{
 movementVector = playerReference.transform.position - this.transform.position; // subtract enemy pos from player pos
 
 movementVector.Normalize(); // normalize pos
 
 rigidbody.velocity += 0.03*(movementVector*enemySpeed - rigidbody.velocity); // tells enemy to move to player
 //current position = itself, plus a portion of the difference between the current position and the target position
 
}
*/

 /*if (playerX < 0){ // left side
  pXfromWall =  xylimit + playerX;
 }else{ //right Side
   pXfromWall = playerX - xylimit;
 }
 if (playerY < 0){ // Top side
   pYfromWall =  xylimit + playerY;
 }else{ //Bottom Side
   pYfromWall = playerY - xylimit;
 }
 ///---------------------------------------------------///
 if (thisX < 0){ // right side
   tXfromWall = xylimit + thisX;
 }else{ //left Side
   tXfromWall = thisX - xylimit;
 }
 if (thisY < 0){ // Top side
   tYfromWall = xylimit + thisY;
 }else{ //Bottom Side
   tYfromWall = thisY - xylimit;
 }
 
 
 //distance from enemy to player, via euler   = (playerX+ thisX)
 //distance via edges         = (pXfromWall + tXfromWall)
 
 
 if ( (pXfromWall + tXfromWall) < (playerX + thisX)){
 tmpVec.x = thisX - playerX;
 }
 else{
 tmpVec.x = thisY + playerY; 
 }
 
 if ( (pYfromWall + tYfromWall) > (playerY + thisY)){
 tmpVec.z = thisX - playerX;
 }
 else{
 tmpVec.z = thisY + playerY; 
 }*/

function UpdateMovement()
{
	var playerX = playerReference.transform.position.x;
	var playerZ = playerReference.transform.position.z;
	var thisX = this.transform.position.x;
	var thisZ = this.transform.position.z;
	var transXY:Vector3;
	var xylimit = 19.0;
	var tmpVec = Vector3(0,0,0);
	//var pXfromWall:float;
	//var pYfromWall:float;
	//var tXfromWall:float;
	//var tYfromWall:float;
	var distanceEPX:float; // distance between en + player for X
	var distanceEPZ:float; // distance between en + player for Y
	var MultiX:float; // direction multiplier for X
	var MultiZ:float; // direction multiplier for Y
	var multiVector:Vector3 = enemySpeed*movementVector; //create multivector multi
 
	
	//if enemy is closer to player via going through wall then go through wall to transport closer to player
	if (!((playerX < 7) && ( playerX > -7) && (playerZ < 7) && ( playerZ > -7)))
	{
		 if(playerX < thisX)
		{
			distanceEPX = (thisX - playerX);
		}
		 else 
		{
			distanceEPX = (playerX - thisX);
		}
		if(distanceEPX > xylimit)
		{
			MultiX = -1;
		}
		else if(distanceEPX < xylimit)
		{
			MultiX = 1;
		} 

		if(playerZ < thisZ)
		{
			distanceEPZ = (thisZ - playerZ);
		}
		 else 
		{
			distanceEPZ = (playerZ - thisZ);
		}
		if(distanceEPZ > xylimit)
		{
			MultiZ = -1;
		}
		else if(distanceEPZ < xylimit)
		{
			MultiZ = 1;
		} 

		//movementVector = tmpVec;

		 
	movementVector = (playerReference.transform.position - this.transform.position); //set movement vector for enemies to check position
	 
	movementVector.Normalize(); // normalize pos
	 
	multiVector.x *= MultiX;
	multiVector.y = 0;
	multiVector.z *= MultiZ;

	rigidbody.velocity += 0.03*(multiVector - rigidbody.velocity);//rigidbody.velocity += 0.03*(Vector3.Scale(Vector3(MultiX, 0, MultiZ)Vector3(movementVector)*enemySpeed - rigidbody.velocity)); // tells enemy to move to player
	 //current position = itself, plus a portion of the difference between the current position and the target position
	}
	
	else
	{
	movementVector = playerReference.transform.position - this.transform.position; // subtract enemy pos from player pos
	 
	movementVector.Normalize(); // normalize pos
		 
	rigidbody.velocity += 0.03*(movementVector*enemySpeed - rigidbody.velocity); // tells enemy to move to player
	//current position = itself, plus a portion of the difference between the current position and the target position
	}
}