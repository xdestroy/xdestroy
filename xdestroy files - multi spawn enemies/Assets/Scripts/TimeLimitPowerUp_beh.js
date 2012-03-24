function Awake()
{
	TimeLimit(); // run timelimit script
}
function TimeLimit()
{
	yield WaitForSeconds(7); // wait for 7 seconds
	Destroy(gameObject); // destroy powerup if not collected
}