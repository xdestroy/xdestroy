#pragma strict

static var score : int = 0;



function OnTriggerEnter(collision : Collider)
{
	switch(collision.gameObject.name)
	{
		case "Enemy(Clone)":
			Destroy (collision.gameObject);
			score++;
			break;
		case "Wall":
			Destroy (gameObject);
			break;
		
		default:
		
			break;
	}
}