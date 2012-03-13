#pragma strict

public var spawnInterval:float;
public var spawnObj:GameObject;
public var changeRate:float = 0.05;
private var spawnIntervalInterval:int = 15;
private var spawning:boolean = false;


function Awake () 
{
	InvokeRepeating("SpawnRater",0,spawnIntervalInterval);
}

function SpawnObject()
{
	Instantiate(spawnObj,transform.position,Quaternion.identity);
}

function SpawnRater()
{
	StopSpawner();
	spawnInterval =  spawnInterval -changeRate;
	if (spawnInterval < 0.2)
	spawnInterval  = 0.2;
	StartSpawner();
}

function StartSpawner(){
	 print('StartSpawn ='+spawnInterval);
	 InvokeRepeating("SpawnObject", 0, spawnInterval);
	 spawning = true;
}

function StopSpawner(){
	print('StopSpawner');
	CancelInvoke("SpawnObject");
	spawning = false;
}