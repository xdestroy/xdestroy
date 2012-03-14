#pragma strict
public var guiStyle:GUIStyle;
public static var Invincible = false;
public static var GunSpeed = false;
public static var EnemySlow = false;

function OnGUI() {
		GUI.Box(Rect (Screen.width/2 - 35,25,100,20),"Score: "+Lazer_beh.score);
		GUI.Box(Rect (Screen.width/2 - 35,45,100,20),"Lives: "+Player_beh.lives);
		
	if(Invincible)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "INVINCIBLE!", guiStyle);
	}
	else if(GunSpeed)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "FIRE RATE INCREASED!", guiStyle);
	}
	else if(EnemySlow)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "ENEMIES SLOWED!", guiStyle);
	}

else if (Player_beh.gameOver) 
{
	GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "Game Over!", guiStyle);
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -110, 100, 30), "Retry")) // if no lives left ask to rety print game over
	{
		Application.LoadLevel (1);
	}
		if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -80, 100, 30), "Menu")) {
		Application.LoadLevel (0);
	}
		if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -50, 100, 30), "Quit")) {
		Application.Quit();
	}
}
}