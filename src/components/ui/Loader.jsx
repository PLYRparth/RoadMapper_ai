import { useEffect, useState } from "react";

const messages = [
  "🤖 Understanding your goal...",
  "📚 Planning your roadmap...",
  "📝 Creating daily tasks...",
  "🎯 Personalizing difficulty...",
  "🚀 Finalizing roadmap..."
];

export default function Loader() {

  const [step, setStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setStep(prev => {

        if(prev < messages.length - 1)
          return prev + 1;

        return prev;

      });

    },1500);

    return ()=>clearInterval(interval);

  },[]);

  return (

    <div className="flex flex-col items-center justify-center py-20">

      <h2 className="text-3xl font-bold mb-8">

        Generating Roadmap

      </h2>

      <div className="w-full max-w-md">

        {messages.map((msg,index)=>(

          <div
            key={msg}
            className={`mb-4 transition-all duration-500 ${
              index <= step
                ? "opacity-100"
                : "opacity-30"
            }`}
          >

            {msg}

          </div>

        ))}

      </div>

      <div className="w-full max-w-md bg-neutral-200 rounded-full h-3 mt-8">

        <div

          className="bg-black h-3 rounded-full transition-all duration-700"

          style={{

            width:`${
              ((step+1)/messages.length)*100
            }%`

          }}

        />

      </div>

    </div>

  );

}
