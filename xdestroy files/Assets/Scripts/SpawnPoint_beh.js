#pragma strict

public var spawnInterval:float;
public var spawnObj:GameObject;
public var changeRate:float = 0.05;
private var spawnIntervalInterval:int = 15;
private var spawning:boolean = false;


function Awake () 
{
	InvokeRepeating("SpawnRater",0,spawnIntervalInterval); // repeat spawnrater script at spawn interval
}

function SpawnObject()
{
	Instantiate(spawnObj,transform.position,Quaternion.identity); // spawns enemies at position
}

function SpawnRater()
{
	StopSpawner(); // run stop spawn script
	spawnInterval =  spawnInterval -changeRate; // sets spawn interval so that enemies will spawn faster long player is alive
	if (spawnInterval < 0.2) // if spawn int < 0.2
	{
		spawnInterval  = 0.2; // set as 0.2 so that enemies do not spawn too fast after this point
	}
	StartSpawner(); // start spawner script
}

function StartSpawner()
{
	 //print('StartSpawn =  '+spawnInterval+', Instance:'+this+",  spawnObj = "+spawnObj); // print spawn int for debugging purposes
	 InvokeRepeating("SpawnObject", 0, spawnInterval); // start spawning enemies dependant on variables
	 spawning = true; // set spawning to true
}

function StopSpawner()
{
	//print('StopSpawner '+'Instance:'+this); // print stop spawner for debug purposes
	CancelInvoke("SpawnObject"); // stop the invoke repeat
	spawning = false; // set spawning to false
}

function SetSpawnObj(obj:GameObject)
{
StopSpawner();
spawnObj = obj;
StartSpawner();
}