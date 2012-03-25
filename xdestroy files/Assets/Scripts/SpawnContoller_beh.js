// All Array set in prefab, MUST BE SAME LENGTH, each array index corresponds to a Wave / Level
public var setEnemyTypeList:GameObject[]; //List of Enemy prefabs
public var setScoreLevels:int[]; // Score to change wave on.		
public var setNumSpawnPoints:int[]; // Number of spawn points for wave
public var setSpawnSpeed:float[];
public var setEnemySpeed:float[];

public var spawnerPrefab:GameObject; //Spawn Point Prefab, set in the properties of this prefab
private var curEnemyPrefab:GameObject; // Enemy prefab for spawners to use.

private var spawnPointInstanceList:Array; // List of created spawn points.

//logic Switchs and indexs
private var doSpawn:boolean;//check before recycling spawner prefabs.
private var thisSpawnLevel:int = 0; // Keep track of loop in scorecheck
private var lastSpawnLevel:int = -1; 
private var showLevel:boolean = false;

function Awake(){
	//This is just a test, in place of SpawnLogic() in Update().
	//curEnemyPrefab = setEnemyTypeList[0];
	//CreateSpawns(5);
	//print("typelist: "+this.setEnemyTypeList.length);
}

function Update () {
	ControlLogic();
	GuiHook();
}

function ControlLogic(){
	/*
	if (firstRun){
		SetSpawnOptions(thisSpawnLevel);
		RemoveSpawns();
		CreateSpawns(setNumSpawnPoints);
		doSpawn = false;
	}
	*/
	ScoreCheck();
	if (doSpawn){
		SetSpawnOptions(thisSpawnLevel);
		RemoveSpawns();
		CreateSpawns(setNumSpawnPoints[thisSpawnLevel]);
		doSpawn = false;
	}
	
}

function ScoreCheck(){
	if (thisSpawnLevel > lastSpawnLevel){
		print("scorecheck: TSL > LSL");
		doSpawn = true;
		lastSpawnLevel = thisSpawnLevel;
		ScoresLives_beh.showLevel = true;
	}
	else{
		//print("scorecheck: ! TSL > LSL");
		var i:int;
		for (i = setScoreLevels.length-1; i >= 0 ; i--){ // checks through score  array backwoulds, set thisSpawnLevel to coorisponding level
			if (Lazer_beh.score > setScoreLevels[i]){
				print("scorecheck: (! TSL > LSL  ) && (score > scorelevel["+i+'])');
				thisSpawnLevel = i;				
				break;
			}
		}
	}
}

function GuiHook(){
	if (ScoresLives_beh.showLevel){
	ScoresLives_beh.level = thisSpawnLevel + 1;
	ScoresLives_beh.showLevel = true;
	yield WaitForSeconds(2);
	ScoresLives_beh.showLevel = false;
	}
}


/*
function SpawnLogic(){
	if (!doSpawn){
		ScoreCheck();
		//if (firstRun){
		//	doSpawn =true;
		//	}
		if (doSpawn){
			if (thisSpawnLevel == lastSpawnLevel ){
			SetSpawnOptions(thisSpawnLevel);
			RemoveSpawns();
			CreateSpawns(setNumSpawnPoints);
			doSpawn = false;
			}
		}
	}
}


function ScoreCheck(){
var i:int;
	//print (setScoreLevels.length);
	for (i = setScoreLevels.length-1; i >= 0 ; i--) { // go through setScoreLevels backwards
		//print ("Scorecheck: "+ i);
		thisSpawnLevel = i;
		print ("setScoreLevels: "+setScoreLevels[i]+' Lazer_beh.score: '+Lazer_beh.score+' thisSL:'+i+' lastSpawnLevel: '+lastSpawnLevel);
		if ((Lazer_beh.score >= setScoreLevels[i]) && (thisSpawnLevel > lastSpawnLevel)){ // if score greater set the enemy spawn prefab to the same index as scorelevel
			print("scorecheck true");
			lastSpawnLevel = thisSpawnLevel;
			doSpawn = true;
			return;
		}
	}
	// if we get here, there's nothing todo
	doSpawn = false;
}
*/



function SetSpawnOptions(level:int){
	curEnemyPrefab =setEnemyTypeList[level];
	//enemySpawnRate:
	
}


function CreateSpawns(amount:int){
	// create amount of spawner prefabs at random locations
	var i:int;
	for(i = 0; i < amount; i++){ 
		//spawnPointInstanceList[i] = Instantiate(spawnerPrefab,Vector3(Random.Range(-18,18),0,Random.Range(-18,18)), Quaternion.identity);
		Instantiate(spawnerPrefab,Vector3(Random.Range(-18,18),0,Random.Range(-18,18)), Quaternion.identity);
		//print ("spList :"+spawnPointInstanceList[i] );
		}	
		ApplyEnemySpawnType();
}

function ApplyEnemySpawnType(){
	// Make a list of spawnpoints, run the method SetSpawnObj on that object...
	spawnPointInstanceList =  GameObject.FindGameObjectsWithTag("SpawnPoint");
	var i:int;
	for(i = 0; i < spawnPointInstanceList.length; i++){
		spawnPointInstanceList[i].SendMessage('SetSpawnObj',curEnemyPrefab); // call the function to change the spawning enemy type
	}
	
}

function  RemoveSpawns(){
	spawnPointInstanceList =  GameObject.FindGameObjectsWithTag("SpawnPoint");
	if (spawnPointInstanceList.length != 0){
	
		var i:int;
		for( i = 0; i <  spawnPointInstanceList.length; i++){
			Destroy( spawnPointInstanceList[i]);
			}
		}

print ("RemovingSpawns");
}

