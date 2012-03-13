#pragma strict


private var paused:boolean = false;


function Update () {
	if(Input.GetButtonUp("Escape"))
	{
		if(!paused)
		{
		   Time.timeScale = 0;
		   paused=true;
		}
		  else{
		  Time.timeScale = 1;
		  paused=false;
		}
	}
}	


function OnGUI(){

    if(paused) 
	{
		GUI.backgroundColor = Color.white;
		GUI.contentColor = Color.white;
		GUI.Box(Rect(375,200,Screen.width/2,Screen.height/2), "Paused");
    }

    if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -110, 110, 30), "Main Menu"))
	{
		Application.LoadLevel (0);
	}
	if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -80, 110, 30), "Restart"))
	{
		Application.LoadLevel (1);
		Player_beh.lives = 5;
		Lazer_beh.score = 0;
		Time.timeScale = 1;
	}
		if(paused && GUI.Button(Rect(Screen.width/2 - 50,Screen.height/2 -50, 110, 30), "Quit"))
	{
		Application.Quit();

		Time.timeScale = 1;
	}
}