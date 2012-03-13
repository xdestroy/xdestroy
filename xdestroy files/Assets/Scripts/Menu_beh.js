function OnGUI () {
	// Make a background box
	GUI.Box (Rect (Screen.width/2 - 50,Screen.height/2 -110, 100, 30), "Menu");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -80, 100, 30), "PLAY GAME!")) {
		Application.LoadLevel (1);
		Time.timeScale = 1;
	}

	// Make the second button.
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -50, 100, 30), "Instructions")) {
		Application.LoadLevel (2);
	}
	
	if (GUI.Button (Rect (Screen.width/2 - 50,Screen.height/2 -20, 100, 30), "Quit")) {
		Application.Quit();
	}
}