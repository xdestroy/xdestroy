#pragma strict

public var playerSpeed:float; // speed variable for character
public var laserObj:GameObject;
public var bulletFrequency:float;
public var theCamera:Camera;
public var bulletSpeed:float;
static var lives:int = 5;
static var gameOver:boolean = false;
private var isAlive:boolean;
private var invinc:boolean = false;
private var Enemies:GameObject;
private var bullets:boolean;
public var invincibleTexture:Texture2D;
public var norTexture:Texture2D;



function Awake()
{
	isAlive = true;
	StartBullets();
	Init();
}
function Init()
{
	Player_beh.lives = 5;
	Lazer_beh.score = 0;
	Player_beh.gameOver = false;
	Time.timeScale = 1;
}

function Update () 
{
	if (isAlive)
	{
		UpdateMovement();
		if (!bullets){
		StartBullets();
		}
	}
}


function StartBullets(){
//print('StartBullets, BF ='+bulletFrequency);
//bulletFrequency = 0.9;
InvokeRepeating("UpdateBullets", 0, bulletFrequency);
bullets = true;
}

function StopBullets(){
//print('StopBullets');
CancelInvoke("UpdateBullets");
bullets = false;
}


function UpdateMovement()
{
	rigidbody.velocity = Vector3(Input.GetAxis("Horizontal")*playerSpeed, 0, Input.GetAxis("Vertical")*playerSpeed); // allows player to move char
	
}

function UpdateBullets()
{
	if( (Input.GetMouseButton(0) ) || ( Input.GetButton("Shoot")) )
	{
		var bullet:GameObject = Instantiate(laserObj) as GameObject;
		bullet.transform.position = this.transform.position;
		Physics.IgnoreCollision(bullet.collider, collider);
		
		var aimTarget:Vector3 = theCamera.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, theCamera.transform.position.y));
		
		var bulletDirection:Vector3 = aimTarget - transform.position;
		bulletDirection.Normalize();
		
		bullet.rigidbody.velocity = bulletDirection*bulletSpeed;
		
		var bulletAngle:float;
		
		if(bulletDirection.z < 0)
			bulletAngle = Vector3.Angle(bulletDirection, Vector3(1,0,0));
		else
			bulletAngle = Vector3.Angle(bulletDirection, Vector3(-1,0,0));
		
		bullet.transform.Rotate(Vector3(0, bulletAngle, 0));
	}
}

function OnTriggerEnter(collision : Collider)
{
	switch(collision.gameObject.name)
	{
		case "Enemy(Clone)":
		UpdateLives();
		break;
		case "Wall":
		WallCollide();
		break;
		case "FastGunSpeed(Clone)":
		Destroy (collision.gameObject);
		GunPowerUp();
		break;
		case "SlowEnemies(Clone)":
		Destroy (collision.gameObject);
		SlowEnemies();
		break;
		case "Invincibility(Clone)":
			Destroy (collision.gameObject);
			Invincible();
		break;
		default:
		break;
	}
}

function InText(Selector:int)
{
switch(Selector)
{
case 1:
	for(var i=0; i<3; i++)
	{
		ScoresLives_beh.Invincible = true;
		yield WaitForSeconds(.2);
		ScoresLives_beh.Invincible = false;
		yield WaitForSeconds(.1);
	}
break;
case 2:
	for(i=0; i<3; i++)
	{
		ScoresLives_beh.GunSpeed = true;
		yield WaitForSeconds(.2);
		ScoresLives_beh.GunSpeed = false;
		yield WaitForSeconds(.1);
	}
break;
case 3:
	for(i=0; i<3; i++)
	{
	ScoresLives_beh.EnemySlow = true;
	yield WaitForSeconds(.2);
	ScoresLives_beh.EnemySlow = false;
	yield WaitForSeconds(.1);
	}
break; 
}
}

function Invincible()
{
	Invincible(8);
}
function Invincible(time:float)
{
		if (isAlive)
	{
		invinc = true;
		StartInvincibility();
		InText(1);
		yield WaitForSeconds(time);
		invinc = false;
		StopInvincibility();
	}
}

function StartInvincibility()
{
	renderer.material.mainTexture = invincibleTexture;
}

function StopInvincibility()
{
	renderer.material.mainTexture = norTexture;
}


function SlowEnemies()
{
	if (isAlive)
	{
		InText(3);
		Enemy_beh.enemySpeed = (Enemy_beh.enemySpeed - 3);
		if(Enemy_beh.enemySpeed <= 4)
		{
			Enemy_beh.enemySpeed = 4;
		}
	}
}

function GunPowerUp() 
{
	if (isAlive)
	{
		InText(2);
		StopBullets();
		bulletFrequency = (bulletFrequency - 0.07);
		if(bulletFrequency <= 0.05)
			{
				bulletFrequency = 0.05;
			}
		StartBullets();
	}
}

 function WallCollide(){
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


function UpdateLives()
{
if (isAlive && (invinc == false))
		if (lives < 2)
			{
				GameOver();
			}
		else
			{
				lives--;
				Die();
			}
}

function Die(){
 var spawnPos : Vector3 = Random.insideUnitCircle * 10;
 this.isAlive = false;
 StopBullets();
 bulletFrequency = 0.3;
 Enemy_beh.enemySpeed = 10;
 this.transform.position = Vector3( spawnPos.x , 10, spawnPos.z );
 this.renderer.enabled = false;
 yield WaitForSeconds(2);
 ReSpawn(spawnPos);
}

function ReSpawn(spawnPos:Vector3){
 this.renderer.enabled = true;
 this.isAlive = true;
 this.transform.position = Vector3( spawnPos.x , 0, spawnPos.z );
 Invincible(2);
}

function GameOver()
{
	lives = 0; // remove final life
	gameOver = true; 
	Time.timeScale = 0; // pause game
	renderer.enabled = false; // hide player object
}