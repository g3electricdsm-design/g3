'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AnimatedServiceIcon } from '@/components/ServiceIcons';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-3">
      <pre className="bg-[#1a1a1d] border border-white/10 rounded-lg p-4 text-sm font-mono text-white-smoke overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="absolute top-2 right-2 px-2 py-1 text-xs font-montserrat font-medium bg-purple/30 hover:bg-purple/60 text-white rounded transition-colors"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function SectionHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div className="mb-10 border-b border-white/10 pb-6" id={id}>
      <h2 className="font-montserrat text-3xl font-semibold text-white mb-2">{title}</h2>
      <p className="font-raleway text-white-smoke/70">{description}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color Palette                                                      */
/* ------------------------------------------------------------------ */

const COLORS = [
  { name: 'purple', hex: '#6D0091', token: 'purple', ring: false },
  { name: 'phlox', hex: '#C636FF', token: 'phlox', ring: false },
  { name: 'earle-black', hex: '#242729', token: 'earle-black', ring: true },
  { name: 'white-smoke', hex: '#F2F2F2', token: 'white-smoke', ring: false },
  { name: 'hookers-green', hex: '#748680', token: 'hookers-green', ring: false },
] as const;

function ColorPalette() {
  return (
    <section className="mb-20">
      <SectionHeading id="colors" title="Color Palette" description="Brand color tokens. Use the Tailwind token name (e.g. bg-purple, text-phlox)." />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {COLORS.map((c) => (
          <div key={c.name} className="flex flex-col items-center gap-3">
            <div
              className={`w-24 h-24 rounded-xl shadow-lg ${c.ring ? 'ring-1 ring-white/20' : ''}`}
              style={{ backgroundColor: c.hex }}
            />
            <div className="text-center">
              <p className="font-montserrat text-sm font-semibold text-white">{c.name}</p>
              <p className="font-mono text-xs text-white-smoke/60">{c.hex}</p>
              <p className="font-mono text-xs text-phlox">{c.token}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Typography                                                         */
/* ------------------------------------------------------------------ */

function Typography() {
  return (
    <section className="mb-20">
      <SectionHeading id="typography" title="Typography" description="Three font families with distinct roles. Fonts are loaded globally via next/font." />

      <div className="space-y-12">
        {/* Megrim */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Megrim &mdash; Display / h1</p>
          <div className="space-y-2">
            <h1 className="font-megrim text-7xl md:text-9xl text-white">G3 Electric</h1>
            <h1 className="font-megrim text-5xl md:text-6xl text-white">Page Title</h1>
          </div>
          <CodeSnippet code={`<h1 className="font-megrim text-6xl text-white">Page Title</h1>`} />
        </div>

        {/* Montserrat */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Montserrat &mdash; Headings / UI</p>
          <div className="space-y-2">
            <h2 className="font-montserrat text-4xl font-semibold text-white">Section Heading (4xl)</h2>
            <h3 className="font-montserrat text-3xl font-semibold text-white">Sub-heading (3xl)</h3>
            <h4 className="font-montserrat text-xl font-semibold text-white">Card Title (xl)</h4>
            <p className="font-montserrat text-sm font-medium text-white-smoke">Label / Caption (sm medium)</p>
          </div>
          <CodeSnippet code={`<h2 className="font-montserrat text-4xl font-semibold text-white">Section Heading</h2>
<h3 className="font-montserrat text-3xl font-semibold text-white">Sub-heading</h3>
<h4 className="font-montserrat text-xl font-semibold text-white">Card Title</h4>
<p className="font-montserrat text-sm font-medium text-white-smoke">Label</p>`} />
        </div>

        {/* Raleway */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Raleway &mdash; Body Copy</p>
          <div className="space-y-2">
            <p className="font-raleway text-xl text-white-smoke">Large body text (xl) — hero descriptions, callouts</p>
            <p className="font-raleway text-lg text-white-smoke">Section description (lg)</p>
            <p className="font-raleway text-base text-white-smoke">Default body copy (base) — paragraphs, card descriptions</p>
            <p className="font-raleway text-sm text-white-smoke/70">Small text (sm) — captions, footnotes</p>
          </div>
          <CodeSnippet code={`<p className="font-raleway text-lg text-white-smoke">Body text</p>
<p className="font-raleway text-sm text-white-smoke/70">Caption</p>`} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

function Buttons() {
  return (
    <section className="mb-20">
      <SectionHeading id="buttons" title="Buttons" description="Two button classes — btn-primary and btn-secondary. Apply to <button>, <a>, or Next.js <Link>." />

      <div className="space-y-10">
        {/* Primary */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Primary</p>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn-primary">Get Free Quote</button>
            <button type="button" className="btn-primary" disabled>Disabled</button>
          </div>
          <CodeSnippet code={`<button className="btn-primary">Get Free Quote</button>
<Link href="/contact" className="btn-primary">Get Free Quote</Link>`} />
        </div>

        {/* Secondary */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Secondary</p>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn-secondary">View Our Work</button>
            <button type="button" className="btn-secondary" disabled>Disabled</button>
          </div>
          <CodeSnippet code={`<button className="btn-secondary">View Our Work</button>
<Link href="/portfolio" className="btn-secondary">View Our Work</Link>`} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Form Inputs                                                        */
/* ------------------------------------------------------------------ */

function FormInputs() {
  const inputBase = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black';
  return (
    <section className="mb-20">
      <SectionHeading id="forms" title="Form Inputs" description="Standard input styles used on the contact page. Always pair with a Montserrat label." />

      <div className="max-w-xl space-y-8">
        {/* Text input */}
        <div>
          <label className="block font-montserrat text-sm font-medium text-white-smoke mb-2">Text Input</label>
          <input type="text" placeholder="Your full name" className={`${inputBase} border-gray-300`} />
        </div>

        {/* Error state */}
        <div>
          <label className="block font-montserrat text-sm font-medium text-white-smoke mb-2">Input &mdash; Error State</label>
          <input type="text" defaultValue="bad@" className={`${inputBase} border-red-500`} />
          <p className="mt-1 text-sm text-red-600 font-raleway">Please enter a valid email address</p>
        </div>

        {/* Select */}
        <div>
          <label className="block font-montserrat text-sm font-medium text-white-smoke mb-2">Select</label>
          <select className={`${inputBase} border-gray-300`}>
            <option value="">Select project type</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>

        {/* Textarea */}
        <div>
          <label className="block font-montserrat text-sm font-medium text-white-smoke mb-2">Textarea</label>
          <textarea rows={3} placeholder="Describe your project..." className={`${inputBase} border-gray-300`} />
        </div>

        {/* Checkboxes */}
        <div>
          <label className="block font-montserrat text-sm font-medium text-white-smoke mb-3">Checkboxes</label>
          <div className="grid grid-cols-2 gap-3">
            {['Lighting Installation', 'Ceiling Fans', 'Electrical Repairs', 'Smart Home'].map((s) => (
              <label key={s} className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded" />
                <span className="ml-2 font-raleway text-sm text-white-smoke">{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <CodeSnippet code={`{/* Label */}
<label className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
  Full Name *
</label>

{/* Text input */}
<input
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg
             focus:ring-2 focus:ring-purple focus:border-purple
             font-raleway text-earle-black"
  placeholder="Your full name"
/>

{/* Error message */}
<p className="mt-1 text-sm text-red-600 font-raleway">Error text</p>

{/* Checkbox */}
<label className="flex items-center">
  <input type="checkbox" className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded" />
  <span className="ml-2 font-raleway text-sm text-white-smoke">Option</span>
</label>`} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */

function Cards() {
  return (
    <section className="mb-20">
      <SectionHeading id="cards" title="Cards" description="Three card patterns used across the site." />

      <div className="space-y-12">
        {/* Service Preview Card (homepage) */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Service Preview Card &mdash; Homepage</p>
          <div className="max-w-xs">
            <div className="rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden border border-white-smoke">
              <div className="h-48 bg-gradient-to-br from-purple/60 to-phlox/60 flex items-center justify-center p-4">
                <AnimatedServiceIcon serviceId="lighting" className="w-[150px] h-[150px]" />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Lighting</h3>
                <p className="font-raleway text-white">Custom lighting solutions for every space</p>
              </div>
            </div>
          </div>
          <CodeSnippet code={`<div className="rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden border border-white-smoke">
  <div className="h-48 bg-gradient-to-br from-purple/60 to-phlox/60 flex items-center justify-center p-4">
    <AnimatedServiceIcon serviceId="lighting" className="w-[150px] h-[150px]" />
  </div>
  <div className="p-6">
    <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Title</h3>
    <p className="font-raleway text-white">Description</p>
  </div>
</div>`} />
        </div>

        {/* Service Row Card (services page) */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Service Row Card &mdash; Services Page</p>
          <div className="w-full max-w-[1200px] bg-earle-black border border-white/10 rounded-2xl px-6 md:pl-8 md:pr-12 py-8 hover:border-purple/50 hover:shadow-xl transition-all shadow-lg">
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
              <div className="w-[180px] h-[180px] bg-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-clip p-[10%] order-first md:order-last">
                <AnimatedServiceIcon serviceId="residential" className="w-full h-full" />
              </div>
              <div className="flex flex-col items-center md:items-start gap-5 md:max-w-[600px] text-center md:text-left w-full">
                <div className="flex flex-col gap-2">
                  <h3 className="font-montserrat text-2xl font-semibold text-white">Residential</h3>
                  <p className="font-raleway text-white-smoke">Safe electrical work for your home</p>
                </div>
                <ul className="flex flex-col items-center md:items-start gap-2 w-full">
                  {['Panel upgrades', 'Outlet installation', 'Ceiling fans'].map((f) => (
                    <li key={f} className="flex items-center font-raleway text-white-smoke">
                      <span style={{ backgroundColor: '#C636FF', width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginRight: 12, display: 'inline-block' }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CodeSnippet code={`<div className="w-full max-w-[1200px] bg-earle-black border border-white/10 rounded-2xl px-6 md:pl-8 md:pr-12 py-8 hover:border-purple/50 hover:shadow-xl transition-all shadow-lg">
  {/* Flex row with icon + text content */}
</div>`} />
        </div>

        {/* Light Info Card */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Light Info Card &mdash; Contact Page</p>
          <div className="max-w-md bg-white-smoke p-6 rounded-lg border border-hookers-green/20">
            <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Schedule a Consultation</h3>
            <p className="font-raleway text-earle-black mb-4">
              Prefer to schedule a specific time? Use our online booking system.
            </p>
            <button type="button" className="btn-primary text-sm">Book Online</button>
          </div>
          <CodeSnippet code={`<div className="bg-white-smoke p-6 rounded-lg border border-hookers-green/20">
  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Title</h3>
  <p className="font-raleway text-earle-black mb-4">Body text</p>
  <button className="btn-primary text-sm">Action</button>
</div>`} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Icons                                                      */
/* ------------------------------------------------------------------ */

const SERVICE_IDS = ['lighting', 'residential', 'commercial', 'safety'] as const;

function ServiceIcons() {
  return (
    <section className="mb-20">
      <SectionHeading id="icons" title="Service Icons" description="Animated SVG icons mapped by service ID. Import AnimatedServiceIcon from @/components/ServiceIcons." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {SERVICE_IDS.map((id) => (
          <div key={id} className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-purple/10 rounded-2xl flex items-center justify-center p-4">
              <AnimatedServiceIcon serviceId={id} className="w-full h-full" />
            </div>
            <p className="font-mono text-sm text-phlox">{id}</p>
          </div>
        ))}
      </div>
      <CodeSnippet code={`import { AnimatedServiceIcon } from '@/components/ServiceIcons';

<AnimatedServiceIcon serviceId="lighting" className="w-[150px] h-[150px]" />
// serviceId: "lighting" | "residential" | "commercial" | "safety"`} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation & Footer                                                */
/* ------------------------------------------------------------------ */

function NavFooterPatterns() {
  return (
    <section className="mb-20">
      <SectionHeading id="nav-footer" title="Navigation & Footer" description="Shared layout components. Pass currentPath to highlight the active link." />

      <div className="space-y-10">
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Navigation (active: Services)</p>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <Navigation currentPath="/services" />
          </div>
          <CodeSnippet code={`import Navigation from '@/components/Navigation';

<Navigation currentPath="/services" />`} />
        </div>

        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Footer</p>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <Footer currentPath="/services" />
          </div>
          <CodeSnippet code={`import Footer from '@/components/Footer';

<Footer currentPath="/services" />`} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Badges & Tags                                                      */
/* ------------------------------------------------------------------ */

function BadgesTags() {
  return (
    <section className="mb-20">
      <SectionHeading id="badges" title="Badges & Tags" description="Category and type tags used in portfolio overlays." />

      <div className="flex flex-wrap gap-3">
        {['Residential', 'Commercial', 'Lighting', 'Safety'].map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-purple/20 font-raleway text-sm font-medium text-phlox uppercase tracking-wide">
            {tag}
          </span>
        ))}
        {['New Build', 'Renovation', 'Repair'].map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/10 font-raleway text-sm font-medium text-white-smoke uppercase tracking-wide">
            {tag}
          </span>
        ))}
      </div>
      <CodeSnippet code={`{/* Category tag (purple) */}
<span className="px-3 py-1 rounded-full bg-purple/20 font-raleway text-sm font-medium text-phlox uppercase tracking-wide">
  Residential
</span>

{/* Type tag (neutral) */}
<span className="px-3 py-1 rounded-full bg-white/10 font-raleway text-sm font-medium text-white-smoke uppercase tracking-wide">
  New Build
</span>`} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feedback / Alerts                                                  */
/* ------------------------------------------------------------------ */

function Feedback() {
  return (
    <section className="mb-20">
      <SectionHeading id="feedback" title="Feedback & Alerts" description="Success/error inline alerts and the toast notification pattern." />

      <div className="space-y-8 max-w-xl">
        {/* Success alert */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Success Alert</p>
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-montserrat font-medium">Thank you for your quote request!</p>
            <p className="font-raleway text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>

        {/* Error alert */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Error Alert</p>
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-montserrat font-medium">There was an error sending your message.</p>
            <p className="font-raleway text-sm mt-1">Please try again or contact us directly.</p>
          </div>
        </div>

        {/* Toast success */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Toast &mdash; Success</p>
          <div className="inline-flex items-center gap-3 rounded-lg px-5 py-4 shadow-2xl" style={{ backgroundColor: '#6D0091', border: '1px solid rgba(198,54,255,0.3)' }}>
            <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-white" />
            <span className="font-montserrat text-sm font-medium text-white pr-2">Project saved successfully</span>
            <button type="button" className="flex-shrink-0 rounded p-1 text-white/60 hover:text-white transition-colors">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Toast error */}
        <div>
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">Toast &mdash; Error</p>
          <div className="inline-flex items-center gap-3 rounded-lg px-5 py-4 shadow-2xl" style={{ backgroundColor: '#242729', border: '1px solid rgba(239,68,68,0.4)' }}>
            <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0 text-red-400" />
            <span className="font-montserrat text-sm font-medium text-white pr-2">Failed to save changes</span>
            <button type="button" className="flex-shrink-0 rounded p-1 text-white/60 hover:text-white transition-colors">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CodeSnippet code={`{/* Success alert */}
<div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
  <p className="font-montserrat font-medium">Success message</p>
  <p className="font-raleway text-sm mt-1">Details</p>
</div>

{/* Error alert */}
<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
  <p className="font-montserrat font-medium">Error message</p>
  <p className="font-raleway text-sm mt-1">Details</p>
</div>

{/* Toast — use the <Toast /> component (reads ?toast= query param) */}
import Toast from '@/components/Toast';`} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Background Contexts                                                */
/* ------------------------------------------------------------------ */

function BackgroundContexts() {
  return (
    <section className="mb-20">
      <SectionHeading id="backgrounds" title="Background Contexts" description="See how components render on the three main background types." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dark */}
        <div className="bg-earle-black border border-white/10 rounded-xl p-6">
          <p className="font-montserrat text-xs uppercase tracking-widest text-phlox mb-4">bg-earle-black</p>
          <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Section Heading</h3>
          <p className="font-raleway text-white-smoke mb-4">Body text on the default dark background.</p>
          <div className="flex gap-3">
            <button type="button" className="btn-primary text-sm">Primary</button>
            <button type="button" className="btn-secondary text-sm">Secondary</button>
          </div>
        </div>

        {/* Light */}
        <div className="bg-white-smoke rounded-xl p-6">
          <p className="font-montserrat text-xs uppercase tracking-widest text-purple mb-4">bg-white-smoke</p>
          <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Section Heading</h3>
          <p className="font-raleway text-earle-black mb-4">Body text on the light background.</p>
          <div className="flex gap-3">
            <button type="button" className="btn-primary text-sm">Primary</button>
            <button type="button" className="btn-secondary text-sm">Secondary</button>
          </div>
        </div>

        {/* Gradient */}
        <div className="bg-gradient-to-br from-purple to-phlox rounded-xl p-6">
          <p className="font-montserrat text-xs uppercase tracking-widest text-white/70 mb-4">gradient purple → phlox</p>
          <h3 className="font-montserrat text-xl font-semibold text-white mb-2">Section Heading</h3>
          <p className="font-raleway text-white/90 mb-4">Body text on the hero gradient background.</p>
          <div className="flex gap-3">
            <button type="button" className="btn-primary text-sm">Primary</button>
            <button type="button" className="btn-secondary text-sm">Secondary</button>
          </div>
        </div>
      </div>

      <CodeSnippet code={`{/* Dark section (default) */}
<section className="bg-earle-black">
  <h2 className="text-white">...</h2>
  <p className="text-white-smoke">...</p>
</section>

{/* Light section */}
<section className="bg-white-smoke">
  <h2 className="text-earle-black">...</h2>
  <p className="text-earle-black">...</p>
</section>

{/* Gradient header */}
<section className="bg-gradient-to-br from-purple to-phlox text-white">
  ...
</section>`} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Table of Contents                                                  */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Form Inputs' },
  { id: 'cards', label: 'Cards' },
  { id: 'icons', label: 'Service Icons' },
  { id: 'nav-footer', label: 'Nav & Footer' },
  { id: 'badges', label: 'Badges & Tags' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'backgrounds', label: 'Backgrounds' },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-earle-black">
      <Navigation currentPath="/style-guide" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Style Guide</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            A living reference of every reusable component and design token in the G3 Electric design system.
          </p>
        </div>
      </section>

      {/* TOC */}
      <div className="border-b border-white/10 bg-earle-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto py-3 scrollbar-hide" aria-label="Style guide sections">
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-montserrat text-sm font-medium text-white-smoke/60 hover:text-phlox whitespace-nowrap transition-colors no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ColorPalette />
        <Typography />
        <Buttons />
        <FormInputs />
        <Cards />
        <ServiceIcons />
        <NavFooterPatterns />
        <BadgesTags />
        <Feedback />
        <BackgroundContexts />
      </div>

      <Footer currentPath="/style-guide" />
    </div>
  );
}
