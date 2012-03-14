#pragma strict

public var powerSpInt:float;
public var spawnPU1:GameObject;
public var spawnPU2:GameObject;
public var spawnPU3:GameObject;
private var puList:GameObject[];


function Awake () 
{
	SpawnPower();
	 puList = Array(spawnPU1,spawnPU2,spawnPU3);

}

function SpawnPower()
{
	yield WaitForSeconds(Random.Range(15.0, 60.0));
	var pos = Vector3(Random.Range(-19,19),0,Random.Range(-19,19));
	Instantiate(puList[Random.Range(0,puList.length)],pos,Quaternion.identity);
	Awake();
}
