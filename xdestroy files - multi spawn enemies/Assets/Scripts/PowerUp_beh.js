#pragma strict

public var powerSpInt:float;
public var spawnPU1:GameObject;
public var spawnPU2:GameObject;
public var spawnPU3:GameObject;
public var spawnPU4:GameObject;
private var puList:GameObject[];


function Awake () 
{
	SpawnPower(); // run spawning for power ups
	puList = Array(spawnPU1, spawnPU2, spawnPU3, spawnPU4); // create array for amount of powerups to spawn
}

function SpawnPower()
{
	if(Player_beh.multib) // if multibullet is on
	{
		yield WaitForSeconds(Random.Range(15.0, 60.0)); // wait for random time between 15 - 60 seconds
		var pos = Vector3(Random.Range(-19,19),0,Random.Range(-19,19)); // select random spawn point
		Instantiate(puList[Random.Range(0,3)],pos,Quaternion.identity); // randomly spawn powerup from array not including multibullet at position set by pos
		Awake();
	}
	else // if multibullet is off
	{
		yield WaitForSeconds(Random.Range(15.0, 60.0)); // wait for random time between 15 - 60 seconds
		pos = Vector3(Random.Range(-19,19),0,Random.Range(-19,19)); // select random spawn point
		Instantiate(puList[Random.Range(0,puList.length)],pos,Quaternion.identity); // randomly spawn powerup from array at position set by pos
		Awake();
	}
}
