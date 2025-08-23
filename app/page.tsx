'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import HairGrowthBuyBox from '../components/HairGrowthBuyBox';
import type { FC } from 'react';

// Add this TypeScript declaration at the top, after imports
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Product page URL for all CTAs
const productPageUrl = 'https://www.onefixlabs.com/products/onefix%E2%84%A2-advanced-micro-infusion-hair-regrowth-kit?variant=55476048822607';

const Page: FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerSectionRef = useRef<HTMLDivElement | null>(null);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 22 * 60 + 33); // 2h 22m 33s in seconds

  // Sticky button state
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Sticky button scroll detection
  useEffect(() => {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowStickyButton(true);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    if (triggerSectionRef.current) {
      stickyObserver.observe(triggerSectionRef.current);
    }

    return () => stickyObserver.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  return (
    <main>
      <div className="bg-gradient-to-r from-slate-100 to-white">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-8 px-2 md:px-4 pt-0 md:pt-0 pb-6 md:pb-16">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-xl order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-slate-900">
              <span className="text-blue-600 font-extrabold">"I Was Losing Hair and Pretending Minoxidil Was Good Enough.</span><br/>
              <span className="text-slate-900 font-extrabold">I made the switch to at home microneedling"</span>
            </h1>
            <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
              <span className="text-lg">🧠</span>
              The First System Built to Fix Hair Loss at the Root
            </div>
            {/* Mobile Image - Only shows on mobile */}
            <div className="flex md:hidden justify-center my-6">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                <Image src="/OG1-placeholder.jpg" alt="Person holding product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">🔬</span>
                <div>
                  <div className="font-semibold text-slate-900">Engineered for Real Male Pattern Baldness*</div>
                  <div className="text-slate-600 text-sm">Targets the hormonal overload and follicle damage — not just patch it up.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">⚙️</span>
                <div>
                  <div className="font-semibold text-slate-900">Built for Lasting Regrowth</div>
                  <div className="text-slate-600 text-sm">Long-lasting freshness, no matter how active your day.</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">💪</span>
                <div>
                  <div className="font-semibold text-slate-900">Confidence You Can Feel Again</div>
                  <div className="text-slate-600 text-sm">Feel fresh, clean, and confident all day long</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-slate-200">
                <span className="text-2xl mt-1">🛠️</span>
                <div>
                  <div className="font-semibold text-slate-900">Total Root Repair</div>
                  <div className="text-slate-600 text-sm">Blocks DHT, shuts down PGD₂, and fuels your scalp with what it's been starving for.</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-4 text-slate-100 font-semibold text-center">
            Take Back Control<br/>
              <span className="text-slate-300 font-normal">No more hiding. No more second-guessing. Just you — with your edge back.</span>
            </div>
            <div className="text-xs text-slate-500 mb-4">Backed by real science on scalp biology, hormone control, and follicle recovery.</div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 items-center justify-center md:justify-center mt-2">
              <div className="flex items-center gap-1"><span className="text-lg">🧬</span> Science-Based Formula</div>
              <div className="flex items-center gap-1"><span className="text-lg">🌿</span> Powered by Nature</div>
              <div className="flex items-center gap-1"><span className="text-lg">🛡️</span> No Harsh Chemicals</div>
              <div className="flex items-center gap-1"><span className="text-lg">⚡</span> Microneedle Delivery System</div>
            </div>
          </div>
          {/* Right: Image - Only shows on desktop */}
          <div className="flex-1 hidden md:flex items-center justify-center order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
              <Image src="/OG1-placeholder.jpg" alt="Person holding product" className="w-[340px] h-[420px] object-cover rounded-xl" width={340} height={420} />
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Confidence with OneFix Labs</h2>
          <p className="text-center text-gray-600 mb-8">"See how real guys dealing with hair loss are finally getting their confidence — and identity — back. No pills. No fluff. Just results that feel real."</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Review 1 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image 
                src="/profile1.jpg" 
                alt="Daniel C." 
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" 
                width={128} 
                height={128} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"The first time in years I liked my reflection."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Daniel C.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">I used to avoid the bathroom mirror. I'd throw on a hoodie just to feel okay. Three weeks into OneFix Labs and I actually caught myself fixing my hair instead of hiding it. Might not sound like much — but to me, that was huge.</div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image 
                src="/profile2.jpg" 
                alt="Jason M." 
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" 
                width={128} 
                height={128} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"Finally found something that works."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Jason M.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">I tried everything. Serums, shampoos, Reddit "hacks." Nothing lasted. OneFix Labs is the first thing that made my scalp feel healthy — like it wasn't fighting me anymore. That alone was a win.</div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image 
                src="/profile3.jpg" 
                alt="Chris R." 
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" 
                width={128} 
                height={128} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"Got my confidence back."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Chris R.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">It's not just about regrowth. It's about not thinking about it all day. I wore a hat for five years straight — now I forget I even have one. That's what OneFix Labs gave me. Headspace.</div>
              </div>
            </div>
            {/* Review 4 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image 
                src="/profile4.jpg" 
                alt="Eli K." 
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" 
                width={128} 
                height={128} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"Finally, real results."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Eli K.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">Why does no one talk about this stuff honestly? Everyone just says, "Shave it." But OneFix Labs actually made me feel like I had a shot again. Like I wasn't broken — just needed the right fix.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Transformation Section */}
      <section className="w-full flex justify-center bg-gray-50 py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-6xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Real Transformations from Real People
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transformation 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/Newimage1.jpg"
                  alt="Transformation 1 - 3 Months"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  3 Months
                </div>
              </div>
            </div>
            {/* Transformation 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/Newimage2.jpg"
                  alt="Transformation 2 - 12 Months"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  12 Months
                </div>
              </div>
            </div>
            {/* Transformation 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/Newimage3.jpg"
                  alt="Transformation 3 - 6 Months"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  6 Months
                </div>
              </div>
            </div>
            {/* Transformation 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/Newimage4.jpg"
                  alt="Transformation 4 - 2 Months"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                  2 Months
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Founder Story Section */}
      <section className="w-full flex justify-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Story */}
          <div className="flex-1 min-w-0 flex flex-col items-start md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/founder-avatar.jpg" alt="Lina founder avatar" className="w-12 h-12 rounded-full object-cover border-2 border-blue-300" width={48} height={48} />
              <span className="text-lg font-semibold text-blue-700">Hey, I'm Jack — I'm the one who started <span className='text-blue-600 font-bold'>OneFix Labs.</span></span>
            </div>
            <div className="text-gray-700 mb-4">
            Not because I set out to build a brand… but because I hit a breaking point.<br/><br/>
              For years, I thought I was just being dramatic about my hair.<br/><br/>
              I figured it was normal. Genetic. Part of getting older.<br/><br/>
              At first, it was just a little thinning.<br/><br/>
              Then it became constant scalp checks. Obsessing. Comparing. Avoiding eye contact.<br/><br/>
              It felt like I was disappearing… strand by strand..

                        </div>
            <div className="bg-white border-l-4 border-blue-400 rounded-r-xl p-2 md:p-4 mb-4 text-blue-700 font-medium shadow">
            I tried everything — oils, shampoos, Reddit stacks, even Minoxidil..
                        </div>
            <div className="text-gray-700 mb-4">
            Some things helped… for a week. But left side effects and my mood changed. Most just made me feel more hopeless.<br/><br/>
              <ul className="list-none pl-0 mb-4">
                <li className="flex items-center gap-2 text-blue-600 font-medium"><span className="text-xl">✗</span> I avoided photos</li>
                <li className="flex items-center gap-2 text-blue-600 font-medium"><span className="text-xl">✗</span> I wore hats every day — even indoors</li>
                <li className="flex items-center gap-2 text-blue-600 font-medium"><span className="text-xl">✗</span> I stopped flirting and going on dates</li>
                <li className="flex items-center gap-2 text-blue-600 font-medium"><span className="text-xl">✗</span> I felt like I didn't recognize myself anymore</li>
              </ul>
              And then one night, while scrolling Reddit at 2am… I saw this guy say, "It's not your hair. It's the environment it's trying to grow in." That hit me. Hard.
                        </div>
                      </div>
          {/* Right: Before/After */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center md:items-center mt-0">
            <div className="bg-white rounded-2xl shadow-lg p-2 pt-0 w-full max-w-xs mx-auto flex flex-col items-center">
              <Image src="/before-after.jpg" alt="My Hair Transformation" className="rounded-xl w-full object-cover mb-2 mt-0" width={400} height={300} />
              <div className="flex justify-between text-xs text-gray-500 mb-1 w-full px-2">
                <span>Before<br/>3 months ago</span>
                <span>After<br/>Today</span>
              </div>
              <div className="text-center text-green-700 font-semibold text-sm">My Hair Transformation</div>
              <div className="text-center text-gray-500 text-xs">After just 12 weeks using OneFix Labs</div>
            </div>
          </div>
        </div>
      </section>
      {/* Root Causes Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">And Just Like That… It All Finally Made Sense</h2>
          <p className="text-center text-green-700 font-medium mb-8">Turns out my hair loss wasn't just "bad genetics" or "getting older." It was the result of a perfect storm happening under the surface: <span className="italic">cause…</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧬</span>
              <div>
                <div className="font-bold text-green-700 mb-1">DHT Overload</div>
                <div className="text-gray-700 text-sm">Your body turns testosterone into DHT — a hormone that clings to your follicles and slowly shuts them down.</div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🚫</span>
              <div>
                <div className="font-bold text-indigo-700 mb-1">PGD₂ Overproduction</div>
                <div className="text-gray-700 text-sm">This chemical builds up in the scalp and acts like a "stop sign" — telling your hair to stop growing.</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🩸</span>
              <div>
                <div className="font-bold text-orange-700 mb-1">Low Blood Flow to Follicles</div>
                <div className="text-gray-700 text-sm">As follicles shrink, they get less oxygen and nutrients — so even healthy hairs can't survive.</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🔥</span>
              <div>
                <div className="font-bold text-purple-700 mb-1">Inflamed, Starved Scalp</div>
                <div className="text-gray-700 text-sm">Years of stress, inflammation, and nutrient loss create a hostile environment where hair can't grow — no matter what you put on it.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-l-4 border-green-400 rounded-r-xl p-2 md:p-4 mb-4 text-green-700 font-medium shadow">
                That's when I realized: It wasn't about more shampoo. It was about fixing the system that grows the hair in the first place
                        </div>
                
        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="italic text-2xl md:text-3xl text-green-800 font-bold mb-4">For the first time, I understood why nothing ever worked: Every product I tried was treating the symptom — not the system. It wasn't about the hair I lost. It was about why my scalp stopped supporting growth in the first place.</div>
            <div className="text-gray-700">
            So after that Reddit comment, I went full rabbit hole mode. PubMed. YouTube derms. Trichology blogs. Forum debates. 2AM deep dives. I became obsessed with one question: What actually helps guys like me?<br/><br/>
            Some talked about blocking DHT. Others swore by circulation boosters. One guy said caffeine only works if you also microneedle. Another broke down PGD₂ like it was a villain in a Marvel movie.<br/><br/>
          
            </div>
          </div>
        </div>
      </section>
      {/* Key Ingredients Section */}
      <section className="w-full flex flex-col items-center bg-purple-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">I Kept Seeing the Same Ingredients — Over and Over — And It Finally Clicked</h2>
          <p className="text-center text-purple-700 mb-10">These weren't trendy shampoo swaps or influencer "hair hacks." They were grounded in real biology — and built for guys like me, the ones who were tired of wasting money on stuff that never reached the root. Saw Palmetto. Caffeine. Apigenin. Microneedling. Not magic — but mechanisms. Not hype — but hormones, blood flow, and scalp repair. That's when it hit me: It wasn't about forcing hair to grow. It was about rebuilding the place it grows from.</p>
          

          
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            {/* Saw Palmetto */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-saw-palmetto.jpg" alt="Paeoniae Radix (Bai Shao)" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-2 md:mb-4 border-4 border-purple-200" width={96} height={96} />
              <div className="font-bold text-purple-800 mb-1">Saw Palmetto</div>
              <div className="text-gray-700 text-sm">🧬 Blocks 5α-reductase — the enzyme that converts testosterone into DHT, the main hormone responsible for shrinking hair follicles.</div>
            </div>
            {/* Myo + D-Chiro Inositol */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-inositol.jpg" alt="L-Tyrosine" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Caffeine</div>
              <div className="text-gray-700 text-sm">⚡⚡ Protects follicles by reducing DHT binding, while stimulating root-level circulation to help "wake up" dormant growth zones.</div>
            </div>
            {/* Berberine */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-berberine.jpg" alt="Angelica sinensis (Dang Gui)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Apigenin</div>
              <div className="text-gray-700 text-sm">🛑 Interrupts PGD₂ — the chemical "stop sign" that tells hair to stop growing. Also acts as a powerful antioxidant and inflammation reducer</div>
            </div>
            {/* Curcumin */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-curcumin.jpg" alt="Ligusticum chuanxiong" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Adenosineg</div>
              <div className="text-gray-700 text-sm">🔁 Stimulates dermal papilla cells (key to hair growth cycle), improving hair thickness and pushing follicles back into the active growth phase.</div>
            </div>
            {/* Zinc */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-zinc.jpg" alt="Bupleurum (Chai Hu)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Ginseng (Panax)</div>
              <div className="text-gray-700 text-sm">💉 Enhances blood flow to the scalp, delivering more oxygen and nutrients directly to struggling follicles.</div>
            </div>
            {/* New Ingredient */}
            <div className="flex flex-col items-center text-center">
              <Image src="/ingredient-placeholder.jpg" alt="Poria (Fu Ling)" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-purple-200" width={112} height={112} />
              <div className="font-bold text-purple-800 mb-1">Biotin</div>
              <div className="text-gray-700 text-sm">🔩 Supports keratin infrastructure, strengthening hair from the inside out and helping reinforce the structure of new strands.</div>
            </div>
          </div>
        </div>
      </section>
      {/* System Failure & Solution Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Text */}
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">It stopped feeling like bad luck… and started feeling like a system failure. That was the moment everything shifted.</div>
            <div className="text-gray-700 mb-4">No one had actually connected the dots. Everything out there felt like guesswork — underdosed, generic, or completely blind to what was really causing hair loss in the first place.</div>
            <div className="text-2xl font-bold text-purple-700 italic mb-2">So I decided to build it myself</div>
            <div className="text-gray-700 mb-4">I partnered with a clinical formulation lab. Spent months buried in research. Talking to dermatologists, trichologists, and endocrinologists. Refining the formula. Scrapping it. Starting over. Again and again. Not because I wanted to launch a brand. Because I needed something that actually worked.</div>
            <div className="text-gray-700">But a formula alone wasn't enough. If the ingredients can't get past the scalp barrier, they never reach the follicle zone. That's why OneFix Labs uses microneedling — not just to deliver deeper, but to wake up blood flow and jumpstart regrowth from the inside out.</div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <Image src="/ezgif.com-video-to-gif-converter.gif" alt="I got this" className="rounded-xl w-full h-auto max-w-full md:max-w-2xl object-cover" width={800} height={400} />
          </div>
        </div>
      </section>
      {/* What Makes OneFix Labs Different Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-10">What Makes OneFix Labs Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Not built for the masses */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">✅</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not built for the "just shave it" crowd</div>
                <div className="text-gray-600 text-sm">OneFix Labs was made for guys who've tried everything — and still can't look in the mirror without flinching.</div>
              </div>
            </div>
            {/* Not another gimmick */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">❌</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not another copy-paste serum</div>
                <div className="text-gray-600 text-sm">No fluff. No filler. Just proven ingredients that target the real root causes of hair loss — DHT, PGD₂, inflammation, and blood flow.</div>
              </div>
            </div>
            {/* Not for people who've never been dismissed by doctors */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🧠</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Not for guys who've never obsessed over their hairline</div>
                <div className="text-gray-600 text-sm">This is for the ones who've tracked every strand, compared every photo, and still felt dismissed by "experts."</div>
              </div>
            </div>
            {/* Created because nothing else worked */}
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-1">🛠️</span>
              <div>
                <div className="font-bold text-gray-900 mb-1">Created because nothing else actually fixed it</div>
                <div className="text-gray-600 text-sm">OneFix Labs wasn't born in a boardroom. It was built out of frustration, science, and a refusal to keep wasting time on false promises.</div>
              </div>
            </div>
          </div>
          {/* Made for us — not them */}
          <div className="flex items-start gap-3 mt-8">
            <span className="text-2xl mt-1">🔒</span>
            <div>
              <div className="font-bold text-gray-900 mb-1">Made for us — not them</div>
              <div className="text-gray-600 text-sm">For the ones who stopped going out, avoided old friends, and still believe it's not too late to take back control.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Introduction Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Product Image and Badges */}
          <div className="flex-1 flex flex-col items-center md:items-start relative mb-8 md:mb-0 w-full">
            <div className="w-full text-center mb-4">
              <span className="text-2xl align-middle">🔥</span>
              <span className="text-purple-700 font-extrabold text-lg sm:text-xl md:text-2xl align-middle ml-2">Introducing...</span>
            </div>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Image src="/bottle-placeholder-onefixlabs.jpg" alt="Product bottle" className="w-full h-auto object-contain rounded-xl" width={320} height={400} />
              <span className="absolute top-3 right-3 bg-pink-200 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow">Clinically Tested</span>
            </div>
          </div>
          {/* Right: Product Details */}
          <div className="flex-1">
            <div ref={triggerSectionRef} className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Just One Serum + Microneedle, Once a Week</div>
            <div className="text-green-600 font-semibold text-lg mb-2">Target the Real Root Causes of Hair Loss — and Finally See Growth That Lasts</div>
            <div className="text-gray-700 mb-3">This isn't another shampoo. It's not a placebo spray. It's a system designed to go beneath the surface — where the real damage is happening. OneFix Labs works by restoring the broken signals in your scalp: Blocking DHT. Interrupting PGD₂. Recharging blood flow. All delivered through precision microneedling — so it actually gets where it needs to go.</div>
            <div className="italic text-gray-600 mb-6">Formulated by real people who've lived through the hair loss spiral. Built for those who are still in it — and ready to fight back.</div>
            <a
              href={productPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow text-center"
            >
              SUBSCRIBE & SAVE <span>🛒</span>
            </a>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> 60-Day Money Back Guarantee</div>
              <div className="flex items-center gap-2 text-green-600 text-sm"><span>●</span> Free Shipping</div>
            </div>
          </div>
        </div>
      </section>
      {/* Transformation Experience Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Here's What You'll Feel With <span className='text-green-600'>Know</span></h2>
          <div className="text-center text-gray-500 text-sm mb-8">(Not hype. Just what the science — and real guys — keep saying.)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Peaceful Showers Again */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">🪞</span>
              <div className="font-bold text-green-700 mb-1">Mirror Relief</div>
              <div className="text-gray-700 text-sm">You'll catch your reflection… and not flinch. No more scanning the hairline in dread.</div>
            </div>
            {/* Full, Feminine Hair */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">🧠</span>
              <div className="font-bold text-green-700 mb-1">Mental Clarity</div>
              <div className="text-gray-700 text-sm">When you're not obsessing over every shed hair, you can finally focus on life again.</div>
            </div>
            {/* Mirror Moments */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">🧬</span>
              <div className="font-bold text-green-700 mb-1">Scalp Feels Alive Again</div>
              <div className="text-gray-700 text-sm">Less tension. Better blood flow. The surface feels healthier — because it is.</div>
            </div>
            {/* Self-Love Again */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">📸</span>
              <div className="font-bold text-green-700 mb-1">Photos Without the Hat</div>
              <div className="text-gray-700 text-sm">You stop reaching for the cap. You stop dodging photos. You start showing up again.</div>
            </div>
            {/* Made for PCOS Warriors */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">🔁</span>
              <div className="font-bold text-green-700 mb-1">Steady Progress</div>
              <div className="text-gray-700 text-sm">Hair doesn't just grow — the whole environment changes. And it feels less like hope… more like momentum.</div>
            </div>
            {/* Dating Confidence */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-2 md:p-4 relative">
              <span className="absolute top-3 right-3 bg-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-full">🛠️</span>
              <div className="font-bold text-green-700 mb-1">Made for Hair Loss Sufferers</div>
              <div className="text-gray-700 text-sm">This isn't for everyone. It's for the ones who were dismissed, mocked, or told "just shave it." OneFix Labs was made for us.</div>
            </div>
          </div>
          <div className="flex justify-center">
            <a 
              href={productPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow"
            >
              RECLAIM YOUR CONFIDENCE
            </a>
            </div>
          </div>
        </section>
      {/* Hair Transformation Journey Section */}
      <section className="w-full flex flex-col items-center bg-green-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">Your Hair Growth Journey</h2>
          <div className="text-center text-gray-600 mb-10">This isn't instant. But it's real. Here's what starts to shift as your body learns how to feel confident again.</div>
          <div className="flex flex-col gap-8 mb-8">
            {/* Day 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-1">1</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-green-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Day 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You apply your first microneedling session. - You won't see it yet, but your scalp is already more receptive — and active ingredients are finally reaching the follicle zone.</div>
              </div>
            </div>
            {/* Week 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-1">2</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-green-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Week 2</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">Your scalp feels less irritated. Less oily. - There's a subtle shift — your hair looks the same, but the environment underneath? Starting to change.</div>
              </div>
            </div>
            {/* Month 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-1">3</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-green-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 1</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You're shedding less in the shower. - You catch yourself not checking your hair every five minutes. One mirror glance didn't wreck your morning — for the first time in a long time.</div>
              </div>
            </div>
            {/* Month 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-1">4</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-green-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 3</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You notice fine hairs at the front. Or maybe in that one thinning patch. More importantly? You feel like you again — walking out the door without a hat. And not thinking twice about it.</div>
              </div>
            </div>
            {/* Month 12 */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center min-w-[32px]">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mb-1">5</div>
                </div>
              <div className="flex-1">
                <div className="font-bold text-green-600 mb-1 flex items-center gap-2"><span role="img" aria-label="calendar">🗓️</span> Month 12</div>
                <div className="bg-white rounded-lg p-2 md:p-4 text-gray-700 shadow">You're not "fighting hair loss" anymore. You're just living. Growth is steady. Confidence is back. And when you look in the mirror… you see someone you actually recognize.</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a 
              href={productPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow"
            >
              RECLAIM YOUR CONFIDENCE
            </a>
          </div>
        </div>
      </section>
      {/* Old Way vs New Way Section */}
      <section className="w-full flex justify-center bg-white py-8 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl w-full">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Choice is Clear</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">See how OneFix Labs' science-backed approach compares to everything else you've tried</p>
          </div>
          
          {/* Comparison Image */}
          <div className="text-center mb-12">
            <img src="/2X4A0197.JPG" alt="Hair loss comparison" className="w-full max-w-2xl mx-auto h-auto object-contain rounded-2xl shadow-lg" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Old Way */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 md:p-10 flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">THE OLD WAY</h3>
                <p className="text-red-700 text-sm md:text-base">Everything you've tried that didn't work</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Staring in the mirror, pulling your hair back to check how much you've lost</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Wasting money on shampoos, oils, and influencer "fixes" that never actually work</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Taking supplements that "might help" — with zero noticeable change</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Contemplating spending thousands on a hair transplant</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Wearing hats to dates, work, the gym — just to avoid the shame</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-gray-700 shadow-sm border border-red-200">
                  <p className="font-medium">Hearing the same advice: "just shave it" or "it's normal" — and getting nowhere</p>
                </div>
              </div>
            </div>
          {/* New Way */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 md:p-10 flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">THE NEW WAY</h3>
                <p className="text-green-700 text-sm md:text-base">The OneFix Labs difference</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">Target the real root: DHT overload, PGD₂, inflammation, and blood-starved follicles</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">Powered by science — not hope, hype, or TikTok tricks</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">A 2-part system: microneedle + active serum, built to reach deep beneath the scalp barrier</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">Block the hormonal attack, restore circulation, and reawaken dormant follicles</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">Watch shedding slow, fine hairs return, and your confidence rebuild</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 text-center text-green-900 shadow-sm border border-green-200">
                  <p className="font-medium">Wake up knowing you're finally doing something that works</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Real Women Testimonials Section */}
      <section className="w-full flex flex-col items-center bg-green-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-10">What Real Hair Loss Sufferers Are Saying After Finding OneFix Labs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Testimonial 1 - updated style */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image src="/profile2.jpg" alt="Layla M." className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" width={128} height={128} />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"The first time in years I liked my reflection."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Daniel C.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">I used to avoid the bathroom mirror. I'd throw on a hoodie just to feel okay. Three weeks into using OneFix Labs and I actually caught myself fixing my hair instead of hiding it. Might not sound like much — but to me, that was huge.</div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image src="/profile3.jpg" alt="Rina D." className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" width={128} height={128} />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"Finally… something that actually made a difference."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Marcus W.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">I've tried every serum, vitamin, and scalp scrub out there. OneFix Labs was the first thing that didn't just sit on my scalp. I could feel the difference after microneedling — my scalp felt less tense, and the shedding slowed. I stopped checking my hairline 10 times a day.</div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image src="/profile1.jpg" alt="Samira F." className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" width={128} height={128} />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"No more hiding under hats."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Victor R.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">My girlfriend used to ask why I wore a hat indoors. Truth was — I hated how my hair looked. OneFix Labs gave me back that part of myself. Now we take photos without me angling my head or cropping the top off. It's not just my hair — it's my confidence that's growing back.</div>
              </div>
            </div>
            {/* Testimonial 4 */}
            <div className="bg-blue-50 rounded-xl shadow p-2 md:p-4 flex flex-row items-center gap-3 md:gap-6 mb-3">
              <Image src="/profile4.jpg" alt="Placeholder" className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover bg-white shadow-md flex-shrink-0" width={128} height={128} />
              <div className="flex-1 min-w-0">
                <div className="flex gap-1 mb-1">{[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400 text-base md:text-lg">★</span>))}</div>
                <div className="font-bold text-blue-700 mb-1 text-sm md:text-base">"I didn't even realize how much it was affecting me."</div>
                <div className="font-semibold text-slate-800 mb-0.5 text-xs md:text-sm">- Omar S.</div>
                <div className="text-slate-600 text-xs md:text-sm leading-snug">Losing hair was something I tried to ignore. But I didn't realize how much it chipped away at my confidence until I started feeling like myself again. My scalp feels healthier, less irritated, and I'm starting to see growth around my temples. More than that, I'm less anxious about it every day.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How To Section */}
      <section className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-10">3 Simple Steps. One Fix That Actually Works.<span className="text-blue-700"></span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-lg p-6">
              <img src="/Step1.gif" alt="Step 1" className="w-full h-56 object-cover rounded-xl mb-4" />
              <div className="text-3xl font-extrabold text-blue-700 mb-2">Step 1</div>
              <div className="text-base text-gray-700 font-semibold mb-2 text-center">Carefully pour the OneFix serum into the microneedle applicator, then securely screw the applicator head on until tight.</div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-lg p-6">
              <img src="/Step2.gif" alt="Step 2" className="w-full h-56 object-cover rounded-xl mb-4" />
              <div className="text-3xl font-extrabold text-blue-700 mb-2">Step 2</div>
              <div className="text-base text-gray-700 font-semibold mb-2 text-center">Turn the applicator upside down for 2 minutes to allow the serum to fully absorb into the microneedle head.</div>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-2xl shadow-lg p-6">
              <img src="/Step3.gif" alt="Step 3" className="w-full h-56 object-cover rounded-xl mb-4" />
              <div className="text-3xl font-extrabold text-blue-700 mb-2">Step 3</div>
              <div className="text-base text-gray-700 font-semibold mb-2 text-center">Lightly press and stamp the applicator onto thinning areas, overlapping each section by 50% to maximize serum absorption into the scalp.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Urgency Section */}
      <section className="w-full flex flex-col items-center bg-white py-6 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full flex flex-col items-center">
          <div className="w-full bg-purple-700 rounded-2xl flex flex-row items-center p-3 md:p-8 mb-6">
            {/* Image and badge */}
            <div className="relative w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center mr-6">
              <Image src="/microneedle-kit.jpg" alt="Limited Supply" className="w-16 h-16 object-contain" width={64} height={64} />
              <span className="absolute top-2 left-2 bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded-full shadow">Limited Supply</span>
            </div>
            {/* Text */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-300 text-lg">⚠️</span>
                <span className="font-bold text-lg md:text-xl">There is a high risk of selling out</span>
              </div>
              <div className="text-white/90 text-sm md:text-base">OneFix Labs uses rare, high-quality actives like Apigenin and Saw Palmetto — combined with a precision microneedling system. Each batch is small-run to ensure potency. When it's gone, restocks take time. - If it's in stock, don't wait.</div>
            </div>
          </div>
          <a
            href={productPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full text-lg transition mb-2 flex items-center justify-center gap-2 shadow"
          >
            UNLOCK YOUR TRUE POWER <span>🛒</span>
          </a>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2 text-blue-600 text-sm"><span>●</span> 60-Day Money Back</div>
            <div className="flex items-center gap-2 text-blue-600 text-sm"><span>●</span> Free Shipping</div>
          </div>
        </div>
      </section>
      {/* Relatable Problems Section */}
      <section className="w-full flex flex-col items-center bg-purple-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-2">If Any of This Sounds Familiar… You're Not Alone</h2>
          <div className="text-center text-purple-700 mb-10">Hair loss isn't just cosmetic. It's quiet, constant, and hits deeper than most people realize.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🪞</span>
              <div className="font-bold text-purple-800 mb-1">Dreading going out</div>
              <div className="text-gray-600 text-sm">You already know what you'll see — and it wrecks your mood before the day starts.</div>
            </div>
            {/* Problem 2 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧢</span>
              <div className="font-bold text-purple-800 mb-1">Wearing a cap all day</div>
              <div className="text-gray-600 text-sm">Not for fashion. But because you don't want to explain "what happened."</div>
            </div>
            {/* Problem 3 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">📸</span>
              <div className="font-bold text-purple-800 mb-1">Sleeping in separate rooms</div>
              <div className="text-gray-600 text-sm">The fear of someone noticing it's worse than before keeps you on edge.</div>
            </div>
            {/* Problem 4 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🙄</span>
              <div className="font-bold text-purple-800 mb-1">Being dismissed</div>
              <div className="text-gray-600 text-sm">Doctors say "it's just aging." People say "shave it." No one gets what it does to you.</div>
            </div>
            {/* Problem 5 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">💥</span>
              <div className="font-bold text-purple-800 mb-1">Losing confidence</div>
              <div className="text-gray-600 text-sm">It's more than hair. It's how you see yourself — and how connected you feel to others.</div>
            </div>
            {/* Problem 6 */}
            <div className="bg-white rounded-xl p-3 md:p-5 shadow flex flex-col items-center text-center">
              <span className="text-3xl mb-2">🧪</span>
              <div className="font-bold text-purple-800 mb-1">Trying everything</div>
              <div className="text-gray-600 text-sm">Shampoos. Oils. Scalp brushes. Reddit hacks. You've lost count — and still nothing sticks.</div>
              </div>
            </div>
          </div>
        </section>
      {/* Let Down Story Section */}
      <section className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Why Men with Hair Loss Have Been <span className="text-green-500">LET DOWN</span> For Years…
          </h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-center">
            <Image src="/letdown1.jpg" alt="Hairloss" className="w-48 h-48 object-cover rounded-xl grayscale" width={192} height={192} />
            <div className="bg-green-50 rounded-xl p-3 md:p-6 flex-1 text-gray-800 shadow">
              <style jsx>{`
                .letdown-strong-text { color: #1a1a1a; }
              `}</style>
              <span className="letdown-strong-text">For decades, hair loss was brushed off as just "part of getting older." Something you were supposed to laugh off, shave off, or just live with.<br/><br/>
              Doctors shrugged.<br/><br/>
              Drugstore shelves filled with copy-paste shampoos. Forums offered hacks, oils, and sketchy stacks.<br/><br/>
              But none of it actually worked — Because none of it addressed what was really happening beneath the surface.<br/><br/>
              DHT overload. Blood-starved follicles. Hormonal blockades. Inflammation. That's the real reason hair stops growing — and why OneFix Labs was built to fix it.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-600 text-lg">●</span>
            <span className="font-bold text-lg md:text-xl text-gray-900">Hair Loss Isn't Just a Receding Hairline — It's a System Breakdown.</span>
          </div>
          <div className="text-gray-900 mb-4">The truth is, men with hair loss face a perfect storm beneath the surface — deep in the biology of their scalp:</div>
          <ul className="mb-4">
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-purple-600">✔</span> <span className="font-bold">DHT overload</span>— your body turns testosterone into a more aggressive form that shrinks and chokes your follicles.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-green-600">✔</span> <span className="font-bold">PGD₂ hormone buildup</span> — this chemical acts like a "stop sign," blocking hair from re-entering the growth phase.</li>
            <li className="flex items-center gap-2 mb-1 text-gray-900"><span className="text-red-500">✔</span> <span className="font-bold">Low blood flow + inflammation</span> — follicles are starved of oxygen and nutrients, while inflammation slowly destroys the growth environment.</li>
          </ul>
          <div className="font-bold text-gray-900 mb-8">No shampoo, pill, or placebo can fix that — unless it works at the root. - That's exactly where OneFix Labs starts.</div>
          <div className="w-full border-2 border-red-400 bg-red-50 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div>
              <div className="font-bold text-gray-900 mb-1 text-lg md:text-xl">❌ But for years, no one built a solution for us.</div>
              <div className="text-gray-900 text-sm md:text-base">Most "hair loss treatments" just push growth — without fixing why it stopped in the first place.<br/><br/>Minoxidil? Feels like forcing sprouts from dying soil — and comes with side effects no one talks about.
              <br/><br/>Hair transplants? Expensive. Invasive. And useless if your scalp environment is still toxic.<br/><br/>And the rest?<br/><br/>Serums that sit on the surface. Reddit hacks. Hype without science.<br/><br/>None of it works — because none of it reaches the root.
              </div>
            </div>
          </div>
          </div>
        </section>
      {/* Comparison Chart Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-8 md:py-16 px-2 md:px-4">
        <div className="max-w-5xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6">How OneFix Labs Compares to the Alternatives</h2>
          
          {/* Formula Introduction */}
          <div className="mb-8 text-center">
            <img src="/2025-8-15 JZ9168.jpg" alt="Formula that works from the root up" className="w-56 h-64 md:w-64 md:h-80 object-contain rounded-lg mx-auto mb-4 shadow-md" />
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-3xl">🧬</span>
              <span className="font-bold text-2xl md:text-3xl text-green-600">Finally, a Formula That Works From the Root Up</span>
            </div>
            <div className="text-gray-700 text-lg">Backed by clinical research, scalp biology, and real-world regrowth results — featuring ingredients like:</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs md:text-sm text-blue-900 font-bold">
                  <th className="p-2 md:p-3 bg-white rounded-tl-xl">Feature / Solution</th>
                  <th className="p-2 md:p-3 bg-white text-center">OneFix Labs</th>
                  <th className="p-2 md:p-3 bg-white text-center">Minoxidil</th>
                  <th className="p-2 md:p-3 bg-white text-center">Hair Transplant</th>
                  <th className="p-2 md:p-3 bg-white rounded-tr-xl text-center">Cheap "Snake Oil"</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Targets Root Cause</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ DHT, PGD₂, inflammation, circulation</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Only stimulates surface growth</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Doesn't address follicle health</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Usually ignores science entirely</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Penetrates to the Follicle Zone</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ Microneedling delivers deep</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Sits on scalp</td>
                  <td className="p-2 md:p-3 bg-green-50 text-blue-700 text-center font-bold">✅ Surgical implantation</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Mostly superficial application</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Science-Backed Ingredients</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ Saw Palmetto, Apigenin, Ginseng, etc.</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">⚠️ Limited science behind effect</td>
                  <td className="p-2 md:p-3 bg-green-50 text-blue-700 text-center font-bold">✅ Yes, but not accessible</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Buzzwords, no clinical support</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Non-Invasive & At-Home</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ Easy 5-min weekly treatment</td>
                  <td className="p-2 md:p-3 bg-green-50 text-blue-700 text-center font-bold">✅ At-home topical</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">❌ Surgery, recovery time</td>
                  <td className="p-2 md:p-3 bg-green-50 text-blue-700 text-center font-bold">✅ But usually useless</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Side Effects</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ None reported with OneFix Labs</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">⚠️ Shedding, irritation, dizziness</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">⚠️ Scarring, infection risk</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center font-bold">❓ Often unknown/unregulated</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Long-Term Scalp Health Support</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ Repairs the growth environment</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ No long-term repair</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">❌ Can fail if scalp is inflamed</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ No support for scalp biology</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Real Confidence Returns</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">✅ Built to restore identity + results</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">⚠️ Temporary gains, emotional drop</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">⚠️ Cosmetic fix, emotional unknown</td>
                  <td className="p-2 md:p-3 bg-gray-50 text-gray-500 text-center">❌ Most users report zero change</td>
                </tr>
                <tr>
                  <td className="p-2 md:p-3 bg-white font-semibold text-blue-900">Cost</td>
                  <td className="p-2 md:p-3 bg-green-50 text-green-700 text-center font-bold">💰 Affordable monthly bundle</td>
                  <td className="p-2 md:p-3 bg-yellow-50 text-yellow-700 text-center font-bold">💰 Low upfront, long-term recurring</td>
                  <td className="p-2 md:p-3 bg-red-50 text-red-700 text-center font-bold">💸 Thousands, one-time (or more)</td>
                  <td className="p-2 md:p-3 bg-red-50 text-red-700 text-center font-bold">💸 Wasteful, adds up fast</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Informative Formula Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-12 px-2 md:px-4">
        <div className="max-w-3xl w-full">
          <h2 className="text-xl md:text-2xl font-bold text-green-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="formula">🧬</span> Finally, a Formula That Works From the Root Up.
          </h2>
          <div className="text-gray-600 mb-6">Backed by clinical research, scalp biology, and real-world regrowth results — featuring ingredients like:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-500 text-lg">🧠</span>
                <span className="font-bold text-green-700">Saw Palmetto</span>
              </div>
              <div className="text-gray-700 text-sm">(Helps block 5α-reductase — the enzyme that turns testosterone into follicle-shrinking DHT)</div>
            </div>
            {/* L-Tyrosine */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-500 text-lg">🌿</span>
                <span className="font-bold text-purple-700">Apigenin</span>
              </div>
              <div className="text-gray-700 text-sm">(Suppresses PGD₂ — the chemical that tells your hair to stop growing)</div>
            </div>
            {/* Berberine + Curcumin */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-pink-500 text-lg">💉</span>
                <span className="font-bold text-pink-700">Caffeine + Ginseng</span>
              </div>
              <div className="text-gray-700 text-sm">(Boost blood flow and revive dormant follicles with increased nutrient delivery)</div>
            </div>
            {/* Paeoniae Radix (Bai Shao) */}
            <div className="bg-purple-50 rounded-xl p-2 md:p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500 text-lg">⚡⚡</span>
                <span className="font-bold text-yellow-700">Delivered with Precision Microneedling</span>
              </div>
              <div className="text-gray-700 text-sm">(So the actives don't just sit on the surface — they go deep, where hair actually grows.</div>
            </div>
          </div>
          <div className="italic text-gray-600 mt-2">All combined in one targeted system designed to repair the ground your hair grows from — and finally give it a reason to grow back.</div>
        </div>
      </section>
      {/* Pricing/Package Choice Section */}
      <HairGrowthBuyBox />
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 md:py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-500">
          <div className="mb-2">© {new Date().getFullYear()} knowhairgrowth.com All rights reserved.</div>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Sticky Add to Cart Button */}
      {showStickyButton && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="max-w-md mx-auto">
            <a
              href={productPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full text-lg transition flex items-center justify-center gap-2 shadow-lg"
            >
              GET ONEFIX NOW <span>🛒</span>
            </a>
            <div className="text-center text-xs text-gray-500 mt-2">
              90-Day Money Back Guarantee • Free Shipping
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Page;