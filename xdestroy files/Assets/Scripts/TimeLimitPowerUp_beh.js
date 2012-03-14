function Awake()
{
	TimeLimit();
}
function TimeLimit()
{
	yield WaitForSeconds(7);
	Destroy(gameObject);
}