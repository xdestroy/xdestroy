#pragma strict

public static var enemySpeed:float = 10; // speed variable for character
private var playerReference:GameObject;
private var movementVector:Vector3;

function ChangeSpeed(inSpeed:float)
{
	enemySpeed = inSpeed;
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

function UpdateMovement()
{
	movementVector = playerReference.transform.position - this.transform.position; // subtract enemy pos from player pos
	
	movementVector.Normalize(); // normalize pos
	
	rigidbody.velocity += 0.03*(movementVector*enemySpeed - rigidbody.velocity); // tells enemy to move to player
	//current position = itself, plus a portion of the difference between the current position and the target position
	
}
