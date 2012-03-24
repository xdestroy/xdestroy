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
public static var multib:boolean = false;



function Awake()
{
	isAlive = true; // if player alive allow to shoot also run initialization 
	StartBullets(); 
	Init(); 
}
function Init()
{
	Player_beh.lives = 5; // intialize lives
	Lazer_beh.score = 0; // intialize score
	Player_beh.gameOver = false; // set gameover as false
	Time.timeScale = 1; // unpause game if paused
}

function Update () 
{
	if (isAlive) // if alive
	{
		UpdateMovement(); // allow movement
		if (!bullets){
		StartBullets(); // if player starts to shoot run startbullets script
		}
	}
}


function StartBullets()
{
	//print('StartBullets, BF ='+bulletFrequency);
	//bulletFrequency = 0.9;
	InvokeRepeating("UpdateBullets", 0, bulletFrequency); // run updatebullets and set bullet speed depending on powerups then repeat the bullets
	bullets = true;
}

function StopBullets()
{
	//print('StopBullets');
	CancelInvoke("UpdateBullets"); // used for bullets power up so that will apply new variable if powerup collected (pauses shooting for .1 second)
	bullets = false;
}


function UpdateMovement()
{
	rigidbody.velocity = Vector3(Input.GetAxis("Horizontal")*playerSpeed, 0, Input.GetAxis("Vertical")*playerSpeed); // allows player to move char
	
}

function UpdateBullets()
{
	if( (Input.GetMouseButton(0) ) || ( Input.GetButton("Shoot")) ) // when mosue or space pressed shoot
	{
		var bullet:GameObject = Instantiate(laserObj) as GameObject;
		bullet.transform.position = this.transform.position;
		Physics.IgnoreCollision(bullet.collider, collider);
		
		var aimTarget:Vector3 = theCamera.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, theCamera.transform.position.y)); // shoot bullets where mouse is
		
		var bulletDirection:Vector3 = aimTarget - transform.position; // set bullet pos  as where mouse is - vector3
		bulletDirection.Normalize(); // norm direction vector3
		
		bullet.rigidbody.velocity = bulletDirection*bulletSpeed; // set bullet to go to direction * speed
		
		var bulletAngle:float;
		
		if(bulletDirection.z < 0) // if bullet direction.z < 0
			bulletAngle = Vector3.Angle(bulletDirection, Vector3(1,0,0));  // set bullet angle to bulletdirection, vector 1,0,0
			
		else if(bulletDirection.z > 0)
			bulletAngle = Vector3.Angle(bulletDirection, Vector3(-1,0,0)); // else set bullet direction angle to bulletdirection, vector -1,0,0
		
		bullet.transform.Rotate(Vector3(0, bulletAngle, 0)); // rotate bullets to bulletAngle var
		
	if(multib) // if multiball powerup make second bullet
		{
			bullet = Instantiate(laserObj) as GameObject; 
			bullet.transform.position = this.transform.position;
			Physics.IgnoreCollision(bullet.collider, collider);
			
			aimTarget = theCamera.ScreenToWorldPoint(Vector3(Input.mousePosition.x + 15, Input.mousePosition.y + 15, theCamera.transform.position.y)); // shoot bullets where mouse is + 15 for angle
			
			bulletDirection = aimTarget - this.transform.position; // set bullet pos as where mouse is - vector3
			bulletDirection.Normalize(); // norm direction vector3
			
			bullet.rigidbody.velocity = bulletDirection*bulletSpeed; // set bullet velocity to direction * speed
			
			if(bulletDirection.z < 0) // if bullet direction.z < 0
				bulletAngle = Vector3.Angle(bulletDirection, Vector3(1,0,0));  // set bullet angle to bulletdirection, vector 1,0,0
				
			else if(bulletDirection.z > 0)
				bulletAngle = Vector3.Angle(bulletDirection, Vector3(-1,0,0)); // else set bullet direction angle to bulletdirection, vector -1,0,0
			
			bullet.transform.Rotate(Vector3(0, bulletAngle, 0)); // rotate bullets to bulletAngle var
		}
	if(multib) // if multiball powerup make third bullet
		{
			bullet = Instantiate(laserObj) as GameObject; 
			bullet.transform.position = this.transform.position;
			Physics.IgnoreCollision(bullet.collider, collider);
			
			aimTarget = theCamera.ScreenToWorldPoint(Vector3(Input.mousePosition.x - 15, Input.mousePosition.y - 15, theCamera.transform.position.y)); // shoot bullets where mouse is - 15 for angle
			
			bulletDirection = aimTarget - this.transform.position; // set bullet pos as where mouse is - vector3
			bulletDirection.Normalize(); // norm direction vector3
			
			bullet.rigidbody.velocity = bulletDirection*bulletSpeed; // set bullet velocity to direction * speed
			
			if(bulletDirection.z < 0) // if bullet direction.z < 0
				bulletAngle = Vector3.Angle(bulletDirection, Vector3(1,0,0));  // set bullet angle to bulletdirection, vector 1,0,0
				
			else if(bulletDirection.z > 0)
				bulletAngle = Vector3.Angle(bulletDirection, Vector3(-1,0,0)); // else set bullet direction angle to bulletdirection, vector -1,0,0
			
			bullet.transform.Rotate(Vector3(0, bulletAngle, 0)); // rotate bullets to bulletAngle var
		}
	}
}

function OnTriggerEnter(collision : Collider) // when player collides with another object
{
	switch(collision.gameObject.name)
	{
		case "Enemy(Clone)": // if player hits enemy
			if(invinc) {
				Destroy (collision.gameObject); // if incible kill enemy not player
				Lazer_beh.score = Lazer_beh.score+1; // add to score if player hits enemy while invinc
				}
			else	
				UpdateLives(); // if not inv run update lives
		break;
		case "Wall": // if player hits wall run wallcolide
		WallCollide();
		break;
		case "FastGunSpeed(Clone)": // if player hits powerup run gun speed
		Destroy (collision.gameObject); // destroy powerup object
		GunPowerUp(); // run gun speed powerup script
		break;
		case "SlowEnemies(Clone)": // if player hits powerup run slow enemies
		Destroy (collision.gameObject); // destroy powerup object
		SlowEnemies(); // run slow enemies pwoerup script
		break;
		case "Invincibility(Clone)": // if player hits powerup run invincible
			Destroy (collision.gameObject); // destroy powerup object
			Invincible(); // run invincible powerup script
		break;
		case "Multibullets(Clone)": // if player hits powerup run multibullets
		Destroy (collision.gameObject); // destroy powerup object
		Multibullets(); // run multibullets powerup script
		break;
		default:
		break;
	}
}



function InText(Selector:int)
{
switch(Selector) // if player picks up powerup
{
case 1: // if pickup = 1 flash text for invincible
	for(var i=0; i<3; i++) // run for 3 seconds
	{
		ScoresLives_beh.Invincible = true; // display text
		yield WaitForSeconds(.2); // wait .2 seconds
		ScoresLives_beh.Invincible = false; // hide text
		yield WaitForSeconds(.1); // wait .1 seconds
	}
break;
case 2: // if pickup = 2 flash text for invincible
	for(i=0; i<3; i++) // run for 3 seconds
	{
		ScoresLives_beh.GunSpeed = true;// display text
		yield WaitForSeconds(.2); // wait .2 seconds
		ScoresLives_beh.GunSpeed = false; // hide text
		yield WaitForSeconds(.1); // wait .1 seconds
	}
break;
case 3: // if pickup = 3 flash text for invincible
	for(i=0; i<3; i++) // run for 3 seconds
	{
	ScoresLives_beh.EnemySlow = true; // display text
	yield WaitForSeconds(.2); // wait .2 seconds
	ScoresLives_beh.EnemySlow = false; // hide text
	yield WaitForSeconds(.1); // wait .1 seconds
	}
break; 
case 4: // if pickup = 4 flash text for invincible
	for(i=0; i<3; i++) // run for 3 seconds
	{
	ScoresLives_beh.Multibullets = true; // display text
	yield WaitForSeconds(.2); // wait .2 seconds
	ScoresLives_beh.Multibullets = false; // hide text
	yield WaitForSeconds(.1); // wait .1 seconds
	}
break; 
}
}

function Multibullets()
{
	if (isAlive) // if player alive
	{
		multib = true; // set multib as true
		InText(4); // flash multibullets text
	}
}

function Invincible() 
{
	Invincible(8); // set default value for invincible as 8 seconds
}
function Invincible(time:float)
{
	if (isAlive) // if player alive 
	{
		invinc = true; // invible = true
		StartInvincibility(); // run start invic script
		InText(1); // run text flash script
		yield WaitForSeconds(time); // wait for 8 seconds (default value)
		invinc = false; // end invic
		StopInvincibility(); // run stop inv script
	}
}

function StartInvincibility()
{
	renderer.material.mainTexture = invincibleTexture; // change texture of player for invinc 
}

function StopInvincibility()
{
	renderer.material.mainTexture = norTexture; // reset texture of player for end of invinc
}


function SlowEnemies()
{
	if (isAlive) // if player alive 
	{
		InText(3); // run script to flash text
		Enemy_beh.enemySpeed = (Enemy_beh.enemySpeed - 3); // change enemy speed var
		Enemy2_beh.enemySpeed = (Enemy2_beh.enemySpeed - 3); // change enemy speed var
		if((Enemy_beh.enemySpeed <= 4) && (Enemy2_beh.enemySpeed <= 4)) // if speed gets below or = 4
		{
			Enemy_beh.enemySpeed = 4; // keep speed at 4 (stop exploits of getting enemies to stop moving)
			Enemy2_beh.enemySpeed = 4; // keep speed at 4 (stop exploits of getting enemy2 to stop moving)
		}
	}
}

function GunPowerUp() 
{
	if (isAlive)
	{
		InText(2); // run script to flash text
		StopBullets(); // stop shooting for period to apply new var
		bulletFrequency = (bulletFrequency - 0.07); // change bullet speed
		if(bulletFrequency <= 0.05) // if bullet speed gets below or = 0.05
			{
				bulletFrequency = 0.05; // keep speed at 0.05 (stop exploits of making bullets shoot too fast)
			}
		StartBullets(); // allow shooting after applied var
	}
}

 function WallCollide()
 { // on wallcollide
	var v:Vector3 = this.rigidbody.position; // decalre v for vector for ultimate lazyness coding

	if(v.x >= 19) // var x axis >= 19
	{
		this.transform.position = Vector3(-19,0,v.z); // move player to -19 on x
	}

	else if(v.x <= -19) // var x axis <= -19
	{
		this.transform.position = Vector3(19,0,v.z);  // move player to 19 on x
	}

	else if(v.z >= 19) // var z axis >= 19
	{
		this.transform.position = Vector3(v.x,0,-19); // move player to 19 on z
	}

	else if(v.z <= -19) // var z axis >= 19
	{
		this.transform.position = Vector3(v.x,0,19); // move player to 19 on z
	}
}


function UpdateLives()
{
if (isAlive && (invinc == false)) // if alive and invincible not true
		if (lives < 2) // if lives are less than 2 (sets so player may not have 0 or -1 lives and keep playing)
			{
				GameOver(); // run gameover
			}
		else
			{
				lives--; // otherwise minus 1 live
				Die(); // run player killed script
			}
}

function Die()
{
	var spawnPos : Vector3 = Random.insideUnitCircle * 10; // variable for random pos for player spawn
	this.isAlive = false; // player object not alive
	StopBullets(); // stop ability to shoot
	bulletFrequency = 0.3; // reset power up for bullets
	Enemy_beh.enemySpeed = 10; // reset speed powerup for enemies
	Enemy2_beh.enemySpeed = 10; // reset speed powerup for enemie2
	multib = false;
	this.transform.position = Vector3( spawnPos.x , 10, spawnPos.z ); // place player as by random spawn position
	this.renderer.enabled = false; // set so cannot see player object
	yield WaitForSeconds(2); // wait 2 seconds
	ReSpawn(spawnPos); // run respawn script at random spawn pos
}

function ReSpawn(spawnPos:Vector3)
{
	 this.renderer.enabled = true; // make player visable
	 this.isAlive = true; // make player alive = true
	 this.transform.position = Vector3( spawnPos.x , 0, spawnPos.z ); // spawn player at random pos
	 Invincible(2); // set invincible for 2 seconds so player does not instant die
}

function GameOver()
{
	lives = 0; // remove final life
	gameOver = true; // set gameover to true	
	Time.timeScale = 0; // pause game
	renderer.enabled = false; // hide player object
}