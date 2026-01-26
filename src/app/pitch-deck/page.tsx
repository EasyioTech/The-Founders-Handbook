import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { StageCard, Callout, DataTable, InfoCard } from "@/components/handbook/UIComponents";
import Link from "next/link";

const deckSlides = [
  {
    number: 1,
    title: "Title Slide",
    time: "10 sec",
    purpose: "First impression. Make them remember your name.",
    mustHave: ["Company name & logo", "One-line tagline", "Your name & title"],
    tips: "Skip generic stock photos. Use a bold visual or your product screenshot.",
    example: "Zerodha: 'Stockbroking, Redefined'"
  },
  {
    number: 2,
    title: "Problem",
    time: "60 sec",
    purpose: "Make them feel the pain. If they don't feel it, they won't care about the solution.",
    mustHave: ["Specific, relatable problem", "Who has this problem", "How painful is it (time/money lost)"],
    tips: "Tell a story. 'Every month, CFOs at mid-sized companies spend 40 hours reconciling invoices manually...'",
    example: "Postman: 'Developers waste 30% of their time on API testing and collaboration issues'"
  },
  {
    number: 3,
    title: "Solution",
    time: "60 sec",
    purpose: "Show your magic moment. The 'aha' that solves the problem.",
    mustHave: ["Product screenshot or demo", "How it solves the problem", "Key differentiator"],
    tips: "Show, don't tell. A 15-second product gif beats three bullet points.",
    example: "Clear: 'One-tap ITR filing for salaried professionals'"
  },
  {
    number: 4,
    title: "Market Size",
    time: "45 sec",
    purpose: "Prove this can be a big business. VCs need 100x potential.",
    mustHave: ["TAM/SAM/SOM with clear logic", "Bottom-up calculation", "Growth drivers"],
    tips: "Bottom-up > Top-down. '50,000 agencies × ₹2L/year = ₹1,000 Cr SAM' beats '1% of $10B market'",
    example: "Chargebee: 'Global subscription economy growing from $275B to $1.5T by 2030'"
  },
  {
    number: 5,
    title: "Business Model",
    time: "45 sec",
    purpose: "Explain how you make money. Keep it simple.",
    mustHave: ["Revenue model (SaaS, usage, marketplace)", "Pricing tiers", "Unit economics snapshot"],
    tips: "One clear model > multiple unproven ones. Show actual pricing, not 'we'll figure it out later.'",
    example: "Razorpay: 'Transaction fee (2%) + SaaS subscriptions for RazorpayX'"
  },
  {
    number: 6,
    title: "Traction",
    time: "90 sec",
    purpose: "This is the slide investors flip to first. Prove you're not just an idea.",
    mustHave: ["Key metrics (ARR/MRR, customers, growth)", "Retention/churn numbers", "Notable logos"],
    tips: "Show trajectory, not just snapshots. A chart going up-and-right is worth 100 words.",
    example: "Show MRR from ₹0 → ₹50L in 9 months with 15% MoM growth"
  },
  {
    number: 7,
    title: "Competition",
    time: "45 sec",
    purpose: "Show you understand the landscape and have a clear wedge.",
    mustHave: ["Honest competitor analysis", "Your unique positioning", "Why you'll win"],
    tips: "Never say 'no competition.' Use a 2x2 matrix positioning you in a clear quadrant.",
    example: "Position on 'Enterprise ↔ SMB' vs 'Full-stack ↔ Point solution' axes"
  },
  {
    number: 8,
    title: "Go-to-Market",
    time: "45 sec",
    purpose: "Prove you know how to get customers repeatably.",
    mustHave: ["Current acquisition channels", "CAC and payback period", "Scaling strategy"],
    tips: "Be specific. 'LinkedIn outbound to IT heads at 200-500 employee companies' > 'Digital marketing'",
    example: "Freshworks: 'Content-led SEO + Product trials + Inside sales for SMB'"
  },
  {
    number: 9,
    title: "Team",
    time: "60 sec",
    purpose: "Investors bet on people. Why are YOU the team to solve this?",
    mustHave: ["Founder backgrounds (relevant experience)", "Key hires", "Unfair advantage"],
    tips: "Focus on founder-market fit. Previous experience in the domain > fancy degrees.",
    example: "'Ex-Flipkart engineering leads who built their logistics platform'"
  },
  {
    number: 10,
    title: "Financials",
    time: "45 sec",
    purpose: "Show you can plan and think in numbers.",
    mustHave: ["Current ARR/burn/runway", "12-18 month projections", "Path to milestones"],
    tips: "Be realistic. Aggressive-but-defensible > hockey stick fantasies.",
    example: "Current: ₹40L ARR, ₹8L/mo burn | Target: ₹2Cr ARR, 15-month runway post-raise"
  },
  {
    number: 11,
    title: "The Ask",
    time: "30 sec",
    purpose: "Tell them exactly what you need and what you'll do with it.",
    mustHave: ["Amount raising", "Use of funds breakdown", "Target milestones"],
    tips: "Be specific: 'Raising ₹8Cr to hit ₹2.5Cr ARR in 18 months'",
    example: "₹8Cr: 50% engineering, 25% sales, 15% marketing, 10% ops"
  },
  {
    number: 12,
    title: "Closing",
    time: "15 sec",
    purpose: "End strong. Leave them wanting to learn more.",
    mustHave: ["Contact info", "Call to action", "Optional: customer quote or vision statement"],
    tips: "Don't end with 'Questions?' End with energy and your contact info.",
    example: "'Building India's operating system for SMB finance. Let's talk.'"
  },
];

const commonMistakes = [
  { mistake: "Too many slides", fix: "Keep it to 12-15 slides max. Investors have short attention spans." },
  { mistake: "Wall of text", fix: "One message per slide. If you can't read it in 3 seconds, cut it." },
  { mistake: "No traction slide", fix: "Even pre-revenue? Show waitlist, LOIs, pilot results, engagement metrics." },
  { mistake: "Vague market size", fix: "Bottom-up calculations. Show your work, not just 'huge market.'" },
  { mistake: "No competitive analysis", fix: "Saying 'no competitors' kills credibility. Everyone has alternatives." },
  { mistake: "Weak team slide", fix: "Focus on founder-market fit and relevant experience, not degrees." },
  { mistake: "Hockey stick financials", fix: "Investors see 100s of decks. Unrealistic projections = red flag." },
  { mistake: "Buried the ask", fix: "Put the ask clearly. Don't make them hunt for what you need." },
];

const deckFormats = [
  { format: "Email Deck", pages: "12-15 slides", notes: "Self-explanatory. Will be read without you present. More text okay." },
  { format: "Pitch Deck", pages: "10-12 slides", notes: "You'll present this. Minimal text, you provide the narrative." },
  { format: "Demo Day Deck", pages: "8-10 slides", notes: "3-5 minute pitch. Ruthlessly focused. One hook, one wow." },
  { format: "Appendix", pages: "5-10 slides", notes: "Deep dives on metrics, team bios, technical architecture. Send if asked." },
];

const designPrinciples = [
  { principle: "Consistency", description: "Same fonts, colors, spacing throughout. Sloppy design = sloppy thinking." },
  { principle: "Contrast", description: "Key numbers should pop. Use size and color to guide the eye." },
  { principle: "Whitespace", description: "Breathe. Crowded slides feel desperate. Let key points stand alone." },
  { principle: "Visual Hierarchy", description: "Title → Key insight → Supporting data. Don't make them search." },
  { principle: "Data Visualization", description: "Charts > tables. Up-and-right lines > bullet point growth claims." },
];

export default function PitchDeckPage() {
  return (
    <HandbookLayout currentSection="pitch-deck">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 2.5</div>
          <h1 className="font-display text-4xl text-foreground">
            The Pitch Deck Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your deck is your first impression. In 20 slides or less, convince 
            investors you&apos;ve found a real problem, built something valuable, and 
            are the team to make it massive.
          </p>
        </header>

        <Callout type="important" title="The 3-Second Rule">
          Investors spend an average of 3 minutes 44 seconds on a deck. Each slide 
          gets roughly 20 seconds. If your key message isn&apos;t visible in 3 seconds, 
          it won&apos;t be seen at all.
        </Callout>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Deck Formats: Know Your Context</h2>
          <p className="text-muted-foreground">
            Different situations call for different decks. Don&apos;t send your presentation 
            deck via email—it won&apos;t make sense without your narration.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {deckFormats.map((format, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{format.format}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {format.pages}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{format.notes}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The 12-Slide Structure</h2>
          <p className="text-muted-foreground">
            This sequence is battle-tested across thousands of successful raises. 
            You can combine or reorder, but don&apos;t skip the essentials.
          </p>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
            
            <div className="space-y-6">
              {deckSlides.map((slide) => (
                <div key={slide.number} className="relative pl-0 sm:pl-20">
                  <div className="hidden sm:flex absolute left-0 w-16 h-16 bg-primary text-primary-foreground rounded-xl items-center justify-center font-display text-2xl">
                    {slide.number}
                  </div>
                  
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="sm:hidden w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-display text-sm">
                            {slide.number}
                          </span>
                          <h3 className="font-semibold text-lg text-foreground">{slide.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{slide.purpose}</p>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded shrink-0 ml-2">
                        ~{slide.time}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Must Include:</h4>
                        <ul className="flex flex-wrap gap-2">
                          {slide.mustHave.map((item, i) => (
                            <li key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs font-medium text-foreground mb-1">Pro Tip:</div>
                        <p className="text-sm text-muted-foreground">{slide.tips}</p>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-muted-foreground">Example: </span>
                        <span className="text-foreground italic">&quot;{slide.example}&quot;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The Traction Slide Deep Dive</h2>
          <p className="text-muted-foreground">
            This is the most important slide in your deck. Investors flip to it first. 
            Here&apos;s how to make it count.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="What to Show (If You Have It)" icon="✓" variant="success">
              <ul className="space-y-2 text-sm">
                <li><strong>ARR/MRR</strong> with growth rate (MoM or YoY)</li>
                <li><strong>Customer count</strong> with notable logos</li>
                <li><strong>Retention metrics</strong> (NRR, churn rate)</li>
                <li><strong>Unit economics</strong> (LTV:CAC, payback)</li>
                <li><strong>Growth chart</strong> showing trajectory</li>
              </ul>
            </InfoCard>
            
            <InfoCard title="Pre-Revenue? Show These:" icon="→" variant="default">
              <ul className="space-y-2 text-sm">
                <li><strong>Waitlist size</strong> and growth</li>
                <li><strong>LOIs</strong> (Letters of Intent) with amounts</li>
                <li><strong>Pilot results</strong> and feedback</li>
                <li><strong>Engagement metrics</strong> (DAU, sessions, NPS)</li>
                <li><strong>Design partner commitments</strong></li>
              </ul>
            </InfoCard>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Traction Metrics by Stage</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-foreground">Stage</th>
                    <th className="text-left py-3 font-medium text-foreground">Primary Metric</th>
                    <th className="text-left py-3 font-medium text-foreground">Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Pre-Seed</td>
                    <td className="py-3">Validated problem + MVP</td>
                    <td className="py-3">10+ unaffiliated users, 50+ discovery calls</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Seed</td>
                    <td className="py-3">Early Revenue + PMF signals</td>
                    <td className="py-3">₹5-20L MRR, 40%+ Sean Ellis score</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 text-muted-foreground">Series A</td>
                    <td className="py-3">ARR + Efficiency</td>
                    <td className="py-3">₹8Cr+ ARR, 3:1+ LTV:CAC, &lt;2x burn multiple</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-muted-foreground">Series B+</td>
                    <td className="py-3">Scale + Path to Profitability</td>
                    <td className="py-3">₹40Cr+ ARR, improving margins, market leadership</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Common Mistakes (And How to Fix Them)</h2>
          
          <div className="space-y-3">
            {commonMistakes.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 text-lg">
                  ✗
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground mb-1">{item.mistake}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Fix: </span>
                    {item.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Design Principles</h2>
          <p className="text-muted-foreground">
            Your deck&apos;s design reflects how you think. Sloppy decks suggest sloppy execution.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designPrinciples.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-2">{item.principle}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <Callout type="tip" title="Tools of the Trade">
            <strong>Recommended:</strong> Figma (free, collaborative), Pitch (built for decks), 
            Canva (quick templates). <strong>Avoid:</strong> Prezi (distracting), heavily 
            animated PowerPoints (won&apos;t survive email forwards).
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The Investor Mindset</h2>
          <p className="text-muted-foreground">
            Understanding what investors are thinking as they review your deck.
          </p>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-4">
              {[
                { question: "Is this a big market?", what: "They need 100x return potential. Small markets = pass." },
                { question: "Why now?", what: "What's changed that makes this possible/necessary today?" },
                { question: "Why this team?", what: "Founder-market fit. Why are YOU uniquely positioned?" },
                { question: "Is there traction?", what: "Proof > promises. Show evidence of demand." },
                { question: "What's the moat?", what: "Why won't Google/competition crush you?" },
                { question: "Can this fund return?", what: "Can this become a ₹1,000+ Cr outcome?" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.question}</div>
                    <div className="text-sm text-muted-foreground">{item.what}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Pitch Delivery Tips</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="In the Room" icon="🎤" variant="default">
              <ul className="space-y-2 text-sm">
                <li><strong>Time yourself:</strong> 15-20 min pitch, 20-25 min Q&A</li>
                <li><strong>Start strong:</strong> Hook them in the first 30 seconds</li>
                <li><strong>Tell stories:</strong> Customer anecdotes > abstract claims</li>
                <li><strong>Know your numbers:</strong> Any metric in your deck = you should know it cold</li>
                <li><strong>Pause for questions:</strong> Engagement is good. Monologues are not.</li>
              </ul>
            </InfoCard>
            
            <InfoCard title="Via Video Call" icon="💻" variant="default">
              <ul className="space-y-2 text-sm">
                <li><strong>Share screen, not control:</strong> Keep control of pacing</li>
                <li><strong>Camera on:</strong> They&apos;re investing in you, not slides</li>
                <li><strong>Shorter deck:</strong> Attention spans are shorter on video</li>
                <li><strong>Send deck after:</strong> Offer to send the deck post-call</li>
                <li><strong>Test tech:</strong> No one invests in founders who can&apos;t share their screen</li>
              </ul>
            </InfoCard>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The Follow-Up</h2>
          
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
            <h3 className="font-semibold text-foreground mb-4">After the Meeting: The 24-Hour Rule</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium">Within 24 hours:</span>
                <span className="text-muted-foreground">Send thank you email with your deck attached</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium">Include:</span>
                <span className="text-muted-foreground">Answers to any questions you couldn&apos;t answer in the meeting</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium">Offer:</span>
                <span className="text-muted-foreground">Additional materials (data room, detailed financials) if they want to go deeper</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium">Ask:</span>
                <span className="text-muted-foreground">Clear next steps. &quot;What would you need to see to move forward?&quot;</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Pre-Launch Checklist</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-3">
              {[
                "Deck is under 15 slides (email version) or 12 slides (pitch version)",
                "Every slide has ONE clear message that's visible in 3 seconds",
                "Traction slide is compelling with real numbers",
                "Market size is bottom-up calculated, not top-down guessed",
                "Competitive slide exists and is honest",
                "Ask is clear: amount, use of funds, target milestones",
                "Design is consistent (fonts, colors, spacing)",
                "Spell-checked and proofread by someone else",
                "Works in offline mode (no broken video embeds)",
                "PDF version exists for email forwards",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Callout type="info" title="Remember">
          Your deck gets you the meeting. Your team, traction, and ability to answer 
          hard questions gets you the term sheet. The deck is necessary but not 
          sufficient—it&apos;s a door opener, not a deal closer.
        </Callout>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/funding-stages" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Funding Stages
          </Link>
          <Link href="/financial-metrics" className="text-primary hover:text-primary/80 transition-colors">
            Financial Metrics →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}
