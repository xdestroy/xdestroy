public var SoundClip : AudioClip;
private var SoundSource : AudioSource;

function Awake()
{
    DontDestroyOnLoad(gameObject);
    SoundSource = gameObject.AddComponent(AudioSource);
    SoundSource.playOnAwake = true;
    //SoundSource.rolloffMode = AudioRolloffMode.Logarithmic;
    SoundSource.loop = true;
}

function Start()
{
    SoundSource.clip = SoundClip;
    SoundSource.Play(); 
}