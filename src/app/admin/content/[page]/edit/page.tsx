'use client';

import { useState, useEffect, use, useId } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { arrayToHtml, htmlToArray } from '@/components/richTextHelpers';
import {
  getPageContent,
  updateContent,
  type ContentPages,
  type HomepageContent,
  type ServicesContent,
  type PricingContent,
  type AboutContent,
  type ContactContent,
} from '@/data/content';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg px-3 py-2 min-h-[120px] bg-gray-50 animate-pulse" />
  ),
});

type PageKey = keyof ContentPages;

const PAGE_TITLES: Record<PageKey, string> = {
  homepage: 'Homepage',
  services: 'Services',
  pricing: 'Pricing',
  about: 'About Us',
  contact: 'Contact Form',
};

const VALID_PAGES = Object.keys(PAGE_TITLES) as PageKey[];

/* ─── shared small components ────────────────────────────── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#F2F2F2', borderRadius: 8, padding: 24 }} className="shadow-sm space-y-5">
      <h3 style={{ color: '#242729' }} className="font-montserrat text-xl font-semibold border-b border-gray-300 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  const fieldId = useId();
  return (
    <div>
      <label htmlFor={fieldId} style={{ color: '#242729' }} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      {/* Clone the child input to inject the matching id */}
      {typeof children === 'object' && children !== null && 'props' in (children as React.ReactElement)
        ? (() => {
            const child = children as React.ReactElement<{ id?: string }>;
            try {
              return <child.type {...child.props} id={fieldId} key={child.key} />;
            } catch {
              return children;
            }
          })()
        : children}
      {hint && <p style={{ color: '#242729', opacity: 0.6 }} className="mt-1 text-xs">{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #D1D5DB',
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  color: '#242729',
  fontSize: '0.875rem',
};

const inputCls = 'focus:ring-2 focus:ring-purple focus:border-transparent font-raleway';

/* ─── per-page form components ───────────────────────────── */

function HomepageForm({
  data,
  onChange,
}: {
  data: HomepageContent;
  onChange: (d: HomepageContent) => void;
}) {
  const set = <K extends keyof HomepageContent>(section: K, field: string, value: string) => {
    onChange({
      ...data,
      [section]: { ...data[section], [field]: value },
    });
  };

  const setServiceItem = (index: number, field: string, value: string) => {
    const items = [...data.services.items];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, services: { ...data.services, items } });
  };

  const addServiceItem = () => {
    onChange({
      ...data,
      services: {
        ...data.services,
        items: [
          ...data.services.items,
          { id: `new-${Date.now()}`, title: '', description: '', icon: 'BoltIcon' },
        ],
      },
    });
  };

  const removeServiceItem = (index: number) => {
    onChange({
      ...data,
      services: {
        ...data.services,
        items: data.services.items.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-8">
      <SectionCard title="Hero Section">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.hero.title} onChange={e => set('hero', 'title', e.target.value)} />
        </Field>
        <Field label="Subtitle">
          <input style={inputStyle} className={inputCls} value={data.hero.subtitle} onChange={e => set('hero', 'subtitle', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.hero.description} onChange={v => set('hero', 'description', v)} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary CTA Button Text">
            <input style={inputStyle} className={inputCls} value={data.hero.ctaPrimary} onChange={e => set('hero', 'ctaPrimary', e.target.value)} />
          </Field>
          <Field label="Secondary CTA Button Text">
            <input style={inputStyle} className={inputCls} value={data.hero.ctaSecondary} onChange={e => set('hero', 'ctaSecondary', e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Services Preview">
        <Field label="Section Title">
          <input style={inputStyle} className={inputCls} value={data.services.title} onChange={e => set('services', 'title', e.target.value)} />
        </Field>
        <Field label="Section Description">
          <RichTextEditor content={data.services.description} onChange={v => set('services', 'description', v)} />
        </Field>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span style={{ color: '#242729' }} className="text-sm font-medium">Service Items</span>
            <button type="button" onClick={addServiceItem} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
              <PlusIcon className="h-4 w-4" /> Add Item
            </button>
          </div>
          {data.services.items.map((item, i) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
              <button type="button" onClick={() => removeServiceItem(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
                <TrashIcon className="h-4 w-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title">
                  <input style={inputStyle} className={inputCls} value={item.title} onChange={e => setServiceItem(i, 'title', e.target.value)} />
                </Field>
                <Field label="Icon Name">
                  <input style={inputStyle} className={inputCls} value={item.icon} onChange={e => setServiceItem(i, 'icon', e.target.value)} />
                </Field>
              </div>
              <Field label="Description">
                <RichTextEditor content={item.description} onChange={v => setServiceItem(i, 'description', v)} />
              </Field>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Call to Action">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.cta.title} onChange={e => set('cta', 'title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.cta.description} onChange={v => set('cta', 'description', v)} />
        </Field>
        <Field label="Button Text">
          <input style={inputStyle} className={inputCls} value={data.cta.buttonText} onChange={e => set('cta', 'buttonText', e.target.value)} />
        </Field>
      </SectionCard>
    </div>
  );
}

function ServicesForm({
  data,
  onChange,
}: {
  data: ServicesContent;
  onChange: (d: ServicesContent) => void;
}) {
  const setHero = (field: string, value: string) =>
    onChange({ ...data, hero: { ...data.hero, [field]: value } });

  const setCta = (field: string, value: string) =>
    onChange({ ...data, cta: { ...data.cta, [field]: value } });

  const setService = (index: number, field: string, value: unknown) => {
    const services = [...data.services];
    services[index] = { ...services[index], [field]: value };
    onChange({ ...data, services });
  };

  const addService = () => {
    onChange({
      ...data,
      services: [
        ...data.services,
        { id: `new-${Date.now()}`, title: '', description: '', features: [], icon: 'BoltIcon' },
      ],
    });
  };

  const removeService = (index: number) => {
    onChange({ ...data, services: data.services.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <SectionCard title="Hero Section">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.hero.title} onChange={e => setHero('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.hero.description} onChange={v => setHero('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Services">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Service Entries</span>
          <button type="button" onClick={addService} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Service
          </button>
        </div>
        {data.services.map((svc, i) => (
          <div key={svc.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeService(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Title">
                <input style={inputStyle} className={inputCls} value={svc.title} onChange={e => setService(i, 'title', e.target.value)} />
              </Field>
              <Field label="Icon Name">
                <input style={inputStyle} className={inputCls} value={svc.icon} onChange={e => setService(i, 'icon', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <RichTextEditor content={svc.description} onChange={v => setService(i, 'description', v)} />
            </Field>
            <Field label="Features" hint="Use bullet list to add features; each bullet becomes one feature entry">
              <RichTextEditor
                content={arrayToHtml(svc.features)}
                onChange={html => setService(i, 'features', htmlToArray(html))}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Call to Action">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.cta.title} onChange={e => setCta('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.cta.description} onChange={v => setCta('description', v)} />
        </Field>
        <Field label="Button Text">
          <input style={inputStyle} className={inputCls} value={data.cta.buttonText} onChange={e => setCta('buttonText', e.target.value)} />
        </Field>
      </SectionCard>
    </div>
  );
}

function PricingForm({
  data,
  onChange,
}: {
  data: PricingContent;
  onChange: (d: PricingContent) => void;
}) {
  const setHero = (field: string, value: string) =>
    onChange({ ...data, hero: { ...data.hero, [field]: value } });

  const setCta = (field: string, value: string) =>
    onChange({ ...data, cta: { ...data.cta, [field]: value } });

  const setTier = (index: number, field: string, value: unknown) => {
    const tiers = [...data.tiers];
    tiers[index] = { ...tiers[index], [field]: value };
    onChange({ ...data, tiers });
  };

  const addTier = () => {
    onChange({
      ...data,
      tiers: [
        ...data.tiers,
        { id: `new-${Date.now()}`, name: '', price: '', description: '', features: [], popular: false },
      ],
    });
  };

  const removeTier = (index: number) => {
    onChange({ ...data, tiers: data.tiers.filter((_, i) => i !== index) });
  };

  const setSP = (index: number, field: string, value: string) => {
    const sp = [...data.servicePricing];
    sp[index] = { ...sp[index], [field]: value };
    onChange({ ...data, servicePricing: sp });
  };

  const addSP = () => {
    onChange({
      ...data,
      servicePricing: [
        ...data.servicePricing,
        { id: `new-${Date.now()}`, service: '', priceRange: '', description: '' },
      ],
    });
  };

  const removeSP = (index: number) => {
    onChange({ ...data, servicePricing: data.servicePricing.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <SectionCard title="Hero Section">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.hero.title} onChange={e => setHero('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.hero.description} onChange={v => setHero('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Pricing Tiers">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Tiers</span>
          <button type="button" onClick={addTier} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Tier
          </button>
        </div>
        {data.tiers.map((tier, i) => (
          <div key={tier.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeTier(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Name">
                <input style={inputStyle} className={inputCls} value={tier.name} onChange={e => setTier(i, 'name', e.target.value)} />
              </Field>
              <Field label="Price">
                <input style={inputStyle} className={inputCls} value={tier.price} onChange={e => setTier(i, 'price', e.target.value)} />
              </Field>
              <Field label="Popular">
                <div className="flex items-center h-full pt-1">
                  <input
                    type="checkbox"
                    checked={tier.popular}
                    onChange={e => setTier(i, 'popular', e.target.checked)}
                    className="h-5 w-5 text-purple focus:ring-purple border-gray-300 rounded"
                  />
                  <span style={{ color: '#242729' }} className="ml-2 text-sm">Mark as popular</span>
                </div>
              </Field>
            </div>
            <Field label="Description">
              <RichTextEditor content={tier.description} onChange={v => setTier(i, 'description', v)} />
            </Field>
            <Field label="Features" hint="Use bullet list for feature items">
              <RichTextEditor
                content={arrayToHtml(tier.features)}
                onChange={html => setTier(i, 'features', htmlToArray(html))}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Service Pricing Table">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Service Rows</span>
          <button type="button" onClick={addSP} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Row
          </button>
        </div>
        {data.servicePricing.map((sp, i) => (
          <div key={sp.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeSP(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Service Name">
                <input style={inputStyle} className={inputCls} value={sp.service} onChange={e => setSP(i, 'service', e.target.value)} />
              </Field>
              <Field label="Price Range">
                <input style={inputStyle} className={inputCls} value={sp.priceRange} onChange={e => setSP(i, 'priceRange', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <input style={inputStyle} className={inputCls} value={sp.description} onChange={e => setSP(i, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Call to Action">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.cta.title} onChange={e => setCta('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.cta.description} onChange={v => setCta('description', v)} />
        </Field>
        <Field label="Button Text">
          <input style={inputStyle} className={inputCls} value={data.cta.buttonText} onChange={e => setCta('buttonText', e.target.value)} />
        </Field>
      </SectionCard>
    </div>
  );
}

function AboutForm({
  data,
  onChange,
}: {
  data: AboutContent;
  onChange: (d: AboutContent) => void;
}) {
  const setHero = (field: string, value: string) =>
    onChange({ ...data, hero: { ...data.hero, [field]: value } });

  const setMission = (field: string, value: string) =>
    onChange({ ...data, mission: { ...data.mission, [field]: value } });

  const setCta = (field: string, value: string) =>
    onChange({ ...data, cta: { ...data.cta, [field]: value } });

  const setValue = (index: number, field: string, value: string) => {
    const values = [...data.values];
    values[index] = { ...values[index], [field]: value };
    onChange({ ...data, values });
  };

  const addValue = () => {
    onChange({
      ...data,
      values: [...data.values, { id: `new-${Date.now()}`, title: '', description: '', icon: 'StarIcon' }],
    });
  };

  const removeValue = (index: number) => {
    onChange({ ...data, values: data.values.filter((_, i) => i !== index) });
  };

  const setTeam = (index: number, field: string, value: string) => {
    const team = [...data.team];
    team[index] = { ...team[index], [field]: value };
    onChange({ ...data, team });
  };

  const addTeam = () => {
    onChange({
      ...data,
      team: [...data.team, { id: `new-${Date.now()}`, name: '', role: '', description: '', image: '' }],
    });
  };

  const removeTeam = (index: number) => {
    onChange({ ...data, team: data.team.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <SectionCard title="Hero Section">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.hero.title} onChange={e => setHero('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.hero.description} onChange={v => setHero('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Mission">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.mission.title} onChange={e => setMission('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.mission.description} onChange={v => setMission('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Core Values">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Values</span>
          <button type="button" onClick={addValue} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Value
          </button>
        </div>
        {data.values.map((val, i) => (
          <div key={val.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeValue(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Title">
                <input style={inputStyle} className={inputCls} value={val.title} onChange={e => setValue(i, 'title', e.target.value)} />
              </Field>
              <Field label="Icon Name">
                <input style={inputStyle} className={inputCls} value={val.icon} onChange={e => setValue(i, 'icon', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <RichTextEditor content={val.description} onChange={v => setValue(i, 'description', v)} />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Team Members">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Members</span>
          <button type="button" onClick={addTeam} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Member
          </button>
        </div>
        {data.team.map((member, i) => (
          <div key={member.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeTeam(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Name">
                <input style={inputStyle} className={inputCls} value={member.name} onChange={e => setTeam(i, 'name', e.target.value)} />
              </Field>
              <Field label="Role">
                <input style={inputStyle} className={inputCls} value={member.role} onChange={e => setTeam(i, 'role', e.target.value)} />
              </Field>
              <Field label="Image Filename">
                <input style={inputStyle} className={inputCls} value={member.image} onChange={e => setTeam(i, 'image', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <RichTextEditor content={member.description} onChange={v => setTeam(i, 'description', v)} />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Call to Action">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.cta.title} onChange={e => setCta('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.cta.description} onChange={v => setCta('description', v)} />
        </Field>
        <Field label="Button Text">
          <input style={inputStyle} className={inputCls} value={data.cta.buttonText} onChange={e => setCta('buttonText', e.target.value)} />
        </Field>
      </SectionCard>
    </div>
  );
}

function ContactForm({
  data,
  onChange,
}: {
  data: ContactContent;
  onChange: (d: ContactContent) => void;
}) {
  const setHero = (field: string, value: string) =>
    onChange({ ...data, hero: { ...data.hero, [field]: value } });

  const setFormMeta = (field: string, value: string) =>
    onChange({ ...data, form: { ...data.form, [field]: value } });

  const setFormField = (fieldKey: string, prop: string, value: string) => {
    onChange({
      ...data,
      form: {
        ...data.form,
        fields: {
          ...data.form.fields,
          [fieldKey]: { ...(data.form.fields as Record<string, Record<string, unknown>>)[fieldKey], [prop]: value },
        },
      },
    });
  };

  const setFormFieldOptions = (fieldKey: string, options: string[]) => {
    onChange({
      ...data,
      form: {
        ...data.form,
        fields: {
          ...data.form.fields,
          [fieldKey]: { ...(data.form.fields as Record<string, Record<string, unknown>>)[fieldKey], options },
        },
      },
    });
  };

  const setInfoItem = (index: number, field: string, value: string) => {
    const items = [...data.info.items];
    items[index] = { ...items[index], [field]: value };
    onChange({ ...data, info: { ...data.info, items } });
  };

  const addInfoItem = () => {
    onChange({
      ...data,
      info: {
        ...data.info,
        items: [...data.info.items, { id: `new-${Date.now()}`, label: '', value: '', icon: 'EnvelopeIcon' }],
      },
    });
  };

  const removeInfoItem = (index: number) => {
    onChange({ ...data, info: { ...data.info, items: data.info.items.filter((_, i) => i !== index) } });
  };

  const formFieldEntries = Object.entries(data.form.fields) as [string, Record<string, unknown>][];

  return (
    <div className="space-y-8">
      <SectionCard title="Hero Section">
        <Field label="Title">
          <input style={inputStyle} className={inputCls} value={data.hero.title} onChange={e => setHero('title', e.target.value)} />
        </Field>
        <Field label="Description">
          <RichTextEditor content={data.hero.description} onChange={v => setHero('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Form Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Form Title">
            <input style={inputStyle} className={inputCls} value={data.form.title} onChange={e => setFormMeta('title', e.target.value)} />
          </Field>
          <Field label="Submit Button Text">
            <input style={inputStyle} className={inputCls} value={data.form.submitButton} onChange={e => setFormMeta('submitButton', e.target.value)} />
          </Field>
        </div>
        <Field label="Form Description">
          <RichTextEditor content={data.form.description} onChange={v => setFormMeta('description', v)} />
        </Field>
      </SectionCard>

      <SectionCard title="Form Fields">
        {formFieldEntries.map(([key, fieldDef]) => (
          <div key={key} className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
            <h4 style={{ color: '#242729' }} className="font-montserrat text-sm font-semibold uppercase tracking-wide">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {typeof fieldDef.label === 'string' && (
                <Field label="Label">
                  <input style={inputStyle} className={inputCls} value={fieldDef.label as string} onChange={e => setFormField(key, 'label', e.target.value)} />
                </Field>
              )}
              {typeof fieldDef.placeholder === 'string' && (
                <Field label="Placeholder">
                  <input style={inputStyle} className={inputCls} value={fieldDef.placeholder as string} onChange={e => setFormField(key, 'placeholder', e.target.value)} />
                </Field>
              )}
            </div>
            {Array.isArray(fieldDef.options) && (
              <Field label="Options" hint="Use bullet list; each bullet becomes a dropdown option">
                <RichTextEditor
                  content={arrayToHtml(fieldDef.options as string[])}
                  onChange={html => setFormFieldOptions(key, htmlToArray(html))}
                />
              </Field>
            )}
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Contact Information">
        <div className="flex items-center justify-between">
          <span style={{ color: '#242729' }} className="text-sm font-medium">Info Items</span>
          <button type="button" onClick={addInfoItem} style={{ color: '#6D0091', backgroundColor: 'transparent', border: 'none' }} className="flex items-center gap-1 text-sm font-medium hover:text-phlox transition-colors">
            <PlusIcon className="h-4 w-4" /> Add Item
          </button>
        </div>
        {data.info.items.map((item, i) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white relative space-y-3">
            <button type="button" onClick={() => removeInfoItem(i)} style={{ color: '#EF4444', backgroundColor: 'transparent', border: 'none' }} className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
              <TrashIcon className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Label">
                <input style={inputStyle} className={inputCls} value={item.label} onChange={e => setInfoItem(i, 'label', e.target.value)} />
              </Field>
              <Field label="Icon Name">
                <input style={inputStyle} className={inputCls} value={item.icon} onChange={e => setInfoItem(i, 'icon', e.target.value)} />
              </Field>
            </div>
            <Field label="Value">
              <RichTextEditor content={item.value} onChange={v => setInfoItem(i, 'value', v)} />
            </Field>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

/* ─── main page ──────────────────────────────────────────── */

export default function EditContentPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = use(params);
  const router = useRouter();
  const pageKey = page as PageKey;
  const isValid = VALID_PAGES.includes(pageKey);

  const [data, setData] = useState<ContentPages[PageKey]>(() => getPageContent(isValid ? pageKey : 'homepage'));
  const [isSaving, setIsSaving] = useState(false);

  // Hydrate from localStorage on the client (overrides SSR defaults if user has saved content)
  useEffect(() => {
    if (isValid) {
      setData(getPageContent(pageKey));
    }
  }, [pageKey, isValid]);

  const handleSave = () => {
    if (!data) return;
    setIsSaving(true);
    updateContent(pageKey, data as ContentPages[typeof pageKey]);
    setTimeout(() => {
      router.push(`/admin?tab=content&toast=${encodeURIComponent(`${PAGE_TITLES[pageKey]} content saved successfully`)}`);
    }, 300);
  };

  if (!isValid) {
    return (
      <div className="min-h-screen bg-earle-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Content page not found.</p>
          <Link href="/admin?tab=content" className="text-purple hover:text-phlox transition-colors underline">
            Back to Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earle-black">
      <Navigation currentPath="/admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/admin?tab=content"
              className="flex items-center text-white hover:text-white-smoke transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Content
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-megrim text-4xl md:text-5xl mb-2">
                Edit {PAGE_TITLES[pageKey]}
              </h1>
              <p className="font-raleway text-lg max-w-3xl">
                Update the content for the {PAGE_TITLES[pageKey].toLowerCase()} page.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push('/admin?tab=content')}
                className="px-5 py-2.5 border border-white/40 text-white rounded-lg hover:bg-white/10 transition-colors font-montserrat font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  opacity: isSaving ? 0.6 : 1,
                  backgroundColor: '#6D0091',
                  color: '#FFFFFF',
                }}
                className="hover:enabled:opacity-90 transition-opacity font-montserrat font-semibold"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 admin-form">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {pageKey === 'homepage' && (
            <HomepageForm data={data as HomepageContent} onChange={d => setData(d)} />
          )}
          {pageKey === 'services' && (
            <ServicesForm data={data as ServicesContent} onChange={d => setData(d)} />
          )}
          {pageKey === 'pricing' && (
            <PricingForm data={data as PricingContent} onChange={d => setData(d)} />
          )}
          {pageKey === 'about' && (
            <AboutForm data={data as AboutContent} onChange={d => setData(d)} />
          )}
          {pageKey === 'contact' && (
            <ContactForm data={data as ContactContent} onChange={d => setData(d)} />
          )}

          {/* Bottom save bar */}
          <div className="mt-10 flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => router.push('/admin?tab=content')}
              className="px-8 py-3 border border-gray-500 text-white-smoke rounded-lg hover:bg-white/5 transition-colors font-montserrat font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-purple text-white rounded-lg hover:bg-phlox transition-colors font-montserrat font-semibold disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </section>

      <Footer currentPath="/admin" />
    </div>
  );
}
