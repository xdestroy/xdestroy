function OnGUI () {
	// Make a background box
	// print instructions as text
	GUI.Label (Rect (Screen.width/2 -30,Screen.height/2 -170, 300, 300), "Instructions");
	GUI.Label (Rect (Screen.width/2 -30,Screen.height/2 -160, 300, 300), "-----------------");
	
	GUI.Label(Rect (Screen.width/2 - 22,Screen.height/2 -148, 150, 30), "Controls" );
	GUI.Label(Rect (Screen.width/2 - 33,Screen.height/2 -130, 150, 30), "W - Forward" );
	GUI.Label(Rect (Screen.width/2 - 33,Screen.height/2 -115, 150, 30), "A - Left" );
	GUI.Label(Rect (Screen.width/2 - 33,Screen.height/2 -100, 150, 30), "D - Right" );
	GUI.Label(Rect (Screen.width/2 - 33,Screen.height/2 -85, 150, 30), "S - Back" );
	GUI.Label(Rect (Screen.width/2 - 80,Screen.height/2 -63, 200, 50), "Mouse1 or Spacebar - Shoot");
	GUI.Label(Rect (Screen.width/2 - 47,Screen.height/2 -43, 160, 30), "Escape - Pause" ); 
	

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -20, 100, 30), "PLAY GAME!")) {
		Application.LoadLevel (1);
		Time.timeScale = 1;
	}
	// Make the second button. If it is pressed, Application.Loadlevel (0) will be executed (menu)
if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 +10, 100, 30), "Main Menu")) {
		Application.LoadLevel (0);
	}
	// Make the third button. If it is pressed, Application will quit
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 +40, 100, 30), "Quit")) {
		Application.Quit();
	}
}