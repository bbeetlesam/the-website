// main component
import { useEffect } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam | Home";
  }, []);

  return (
    <main className="w-full">
      <div className="flex items-center justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="header">We're Only In It For The Money</h1>
      <p>hi boys and girls i'm samudra and i'm the autistic of the group</p>
      <p>
        <br/>
        this one is just for a fucking filler, and a bit of a joke.<br/>lyrics taken from genius btw.<br/><br/>

        [Verse 1]<br/>
        Hey Punk, where you goin' with that flower in your hand?<br/>
        Hey Punk, where you goin' with that flower in your hand?<br/>
        Well, I'm goin' up to Frisco to join a psychedelic band<br/>
        I'm goin' up to Frisco to join a psychedelic band<br/><br/>

        [Verse 2]<br/>
        Hey Punk, where you goin' with that button on your shirt?<br/>
        Hey Punk, where you goin' with that button on your shirt?<br/>
        I'm goin' to the love-in to sit and play my bongos in the dirt<br/>
        Yes, I'm goin' to the love-in to sit and play my bongos in the dirt<br/><br/>

        [Verse 3]<br/>
        Hey Punk, where you goin' with that hair on your head?<br/>
        Hey Punk, where you goin' with that hair on your head?<br/>
        I'm goin' to the dance to get some action<br/>
        Then I'm goin' home to bed<br/>
        I'm goin' to the dance to get some action<br/>
        Then I'm goin' home to bed<br/><br/>

        [Verse 4]<br/>
        Hey Punk, where you goin' with those beads around your neck?<br/>
        Hey Punk, where you goin' with those beads around your neck?<br/>
        I'm goin' to the shrink so he can help me be a nervous wreck<br/><br/>

        [Interlude]<br/>
        Hey Punk!<br/>
        Punky!
        Hey Punk!<br/>
        Punk!<br/>
        Hey Punk!<br/>
        (Hey Punk!)<br/>
        Hey Punk!<br/>
        Hey Punk!<br/>
        Punky!<br/>
        (Hey Punk!)<br/>
        Hey-hey!<br/>
        (Hey Punk!)<br/>
        Go man, go . . . go man, go<br/>
        Just a little bit softer<br/>
        Golly, do I ever have a lot of soul!<br/>
        Punk, I think I love you!<br/>
        Come on, Roy<br/>
        Questi dominga?<br/>
        Let me see that nose, it didn't<br/>
        Orale!<br/>
        I wanna know for sure!<br/>
        Leave my nose alone please!<br/>
        What are you trying to do?<br/>
        He's gonna stand over there<br/>
        Bigashi' nunga!<br/>
        But this is Cheetah<br/>
        Buirote<br/>
        Chita!<br/><br/>
        YEAH! WHEEE!<br/><br/>
      </p>
      <p className="read-the-docs">
        what's the ugliest part of your body?
      </p>
    </main>
  )
}

export default Home;