#pragma strict

public var powerSpInt:float;
public var spawnPU:GameObject;


function Awake () 
{
	SpawnPower();

}

function SpawnPower()
{
	yield WaitForSeconds(Random.Range(10.0, 30.0));
	var pos = Vector3(Random.Range(-19,19),0,Random.Range(-19,19));
	Instantiate(spawnPU,pos,Quaternion.identity);
	Awake();
}
