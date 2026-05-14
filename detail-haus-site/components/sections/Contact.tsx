'use client'
import { useState } from 'react'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SITE_CONFIG } from '@/data/config'
import { PACKAGES } from '@/data/packages'
import { ADDONS } from '@/data/addons'
import { UploadDropzone } from '@/lib/uploadthing'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO Phase 5: POST { ...formFields, photoUrls: uploadedUrls } to form backend
    setSubmitted(true)
  }

  return (
    <section id="contact" className="pb-24 bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="10 / Contact"
            label="Contact"
            title={<>Request a<br /><em>quote.</em></>}
            description="Share a few photos of the vehicle and tell us what you're interested in. Most quotes go out the same day."
            light
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
          <Reveal>
            <div className="flex flex-col gap-8 text-stone">
              {[
                { label: 'Call or Text', value: SITE_CONFIG.phone, href: SITE_CONFIG.phoneHref },
                { label: 'Email', value: SITE_CONFIG.email, href: SITE_CONFIG.emailHref },
                { label: 'Hours', value: 'By appointment' },
                { label: 'Service Area', value: 'Southern Oregon' },
              ].map(m => (
                <div key={m.label}>
                  <div className="text-[0.7rem] tracking-[0.2em] uppercase font-semibold mb-1.5">{m.label}</div>
                  {m.href
                    ? <a href={m.href} className="text-white text-lg hover:text-stone transition-colors">{m.value}</a>
                    : <span className="text-white text-lg">{m.value}</span>
                  }
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            {submitted ? (
              <div className="border border-charcoal p-12 text-center">
                <p className="font-display font-bold text-2xl text-white mb-3">Request sent.</p>
                <p className="text-stone font-light">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Name</span>
                    <input type="text" required placeholder="Your full name" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Phone</span>
                    <input type="tel" required placeholder="(541) 555-0123" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Email</span>
                  <input type="email" required placeholder="you@example.com" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Vehicle</span>
                    <input type="text" required placeholder="2021 Toyota Tacoma" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Package</span>
                    <select className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors">
                      <option value="">Not sure yet — recommend one</option>
                      {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      <option value="addon">Add-ons only</option>
                    </select>
                  </label>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold mb-3">Add-Ons (optional)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ADDONS.map(addon => (
                      <label key={addon.name} className="flex items-center gap-2.5 cursor-pointer group">
                        <input type="checkbox" className="accent-white w-4 h-4" />
                        <span className="text-sm text-stone group-hover:text-white transition-colors">{addon.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Anything we should know?</span>
                  <textarea rows={4} placeholder="Vehicle condition, specific concerns, preferred dates, location, or anything else relevant." className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite resize-none" />
                </label>

                {/* ── Vehicle Photos via UploadThing ── */}
                <div className="flex flex-col gap-3">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">
                    Vehicle Photos <span className="normal-case tracking-normal font-normal opacity-60">(optional — up to 10, helps us quote accurately)</span>
                  </span>
                  <UploadDropzone
                    endpoint="vehiclePhotos"
                    onClientUploadComplete={(res) => {
                      setUploadedUrls(res.map(f => f.ufsUrl))
                      setUploadError(null)
                    }}
                    onUploadError={(err) => {
                      setUploadError(`Upload failed: ${err.message}`)
                    }}
                    appearance={{
                      container: 'border border-charcoal bg-charcoal hover:border-stone transition-colors rounded-none p-8',
                      uploadIcon: 'text-stone',
                      label: 'text-stone text-sm',
                      allowedContent: 'text-graphite text-xs',
                      button: 'bg-white text-ink text-xs tracking-[0.1em] uppercase font-semibold rounded-full px-5 py-2.5 hover:bg-stone hover:text-white transition-colors',
                    }}
                  />
                  {uploadError && (
                    <p className="text-red-400 text-xs">{uploadError}</p>
                  )}
                  {uploadedUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedUrls.map(url => (
                        <div key={url}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="Uploaded vehicle photo" className="w-16 h-16 object-cover border border-charcoal" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold bg-white text-ink hover:bg-stone hover:text-white transition-all duration-200 w-fit">
                  Send Request →
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
