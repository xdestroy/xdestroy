#pragma strict


private var paused:boolean = false;


function Update () {
	if(Input.GetButtonUp("Escape")) // if player presses Esc key
	{
		if(!paused) 
		{
		   Time.timeScale = 0; // pause game
		   paused=true; // set pause to true
		}
		  else{
		  Time.timeScale = 1; // else unpause game
		  paused=false;
		}
	}
}	


function OnGUI(){

    if(paused) 
	{
		GUI.backgroundColor = Color.white;
		GUI.contentColor = Color.white;
		GUI.Box(Rect(375,200,Screen.width/2,Screen.height/2), "Paused"); // create GUI Box that displays "paused"
    }

    if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -110, 110, 30), "Main Menu")) // display main menu button
	{
		Application.LoadLevel (0); // press main menu to go to main menu
	}
	if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -80, 110, 30), "Restart")) // display restart button
	{
		Application.LoadLevel (1); // reload from start
		Player_beh.lives = 5; // reset lives
		Lazer_beh.score = 0; // set score back to 0
		Time.timeScale = 1; // unpause game
	}
		if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -50, 110, 30), "Quit")) // display quit button
	{
		Time.timeScale = 1; // unpause game
		Application.Quit(); // quit the game
	}
}