public var SoundClip : AudioClip;
private var SoundSource : AudioSource;

function Awake()
{
    DontDestroyOnLoad(gameObject); // dont stop sound on level change
    SoundSource = gameObject.AddComponent(AudioSource); //set source for sound
    SoundSource.playOnAwake = true; // play music on start
    //SoundSource.rolloffMode = AudioRolloffMode.Logarithmic;
    SoundSource.loop = true; // loop music
}

function Start()
{
    SoundSource.clip = SoundClip; 
    SoundSource.Play(); // play the sound/music
}