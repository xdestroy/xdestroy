#pragma strict
public var guiStyle:GUIStyle;
public static var Invincible = false;
public static var GunSpeed = false;
public static var EnemySlow = false;
public static var Multibullets = false;
public static var level:int;
public static var showLevel:boolean;

function OnGUI() {
		GUI.Box(Rect (Screen.width/2 - 35,25,100,20),"Score: "+Lazer_beh.score); // show GUI with score
		GUI.Box(Rect (Screen.width/2 - 35,45,100,20),"Lives: "+Player_beh.lives); // show GUI with lives
		
	if(Invincible)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "INVINCIBLE!", guiStyle); // display invincible text if called
	}
	else if(GunSpeed)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "FIRE RATE INCREASED!", guiStyle); // display fire rate text if called
	}
	else if(EnemySlow)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "ENEMIES SLOWED!", guiStyle); // display enemies slowed text if called
	}
	else if(Multibullets)
	{
		GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "MULTIBULLETS!", guiStyle); // display multibullets text if called
	}
	else if(showLevel){
		GUI.Box(Rect(Screen.width/2 - 40,Screen.height/2 +170,100,100), "Wave "+level, guiStyle);
	}

else if (Player_beh.gameOver) 
{
	GUI.Box(Rect(Screen.width/2 - 55,Screen.height/2 -150,300,100), "Game Over!", guiStyle);
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -110, 100, 30), "Retry")) // if no lives left ask to rety, print game over
	{
		Application.LoadLevel (1); // reload level
	}
		if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -80, 100, 30), "Menu")) { // display menu button
		Application.LoadLevel (0); // take player back to menu
	}
		if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -50, 100, 30), "Quit")) { // display quit button
		Application.Quit(); // quit application
	}
}
}