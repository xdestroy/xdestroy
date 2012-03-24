#pragma strict

static var score : int = 0;



function OnTriggerEnter(collision : Collider)
{
	switch(collision.gameObject.name)
	{
		case "Wall":
			Destroy (gameObject); // if bullet collide with wall destroy bullet
			break;
		
		default:
		
			break;
	}
}