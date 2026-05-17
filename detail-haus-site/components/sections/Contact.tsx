'use client'
import { useState } from 'react'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SITE_CONFIG } from '@/data/config'
import { PACKAGES } from '@/data/packages'
import { ADDONS } from '@/data/addons'
import { UploadButton } from '@/lib/uploadthing'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name:      data.get('name'),
      phone:     data.get('phone'),
      email:     data.get('email'),
      vehicle:   data.get('vehicle'),
      package:   data.get('package'),
      addons:    data.getAll('addons'),
      notes:     data.get('notes'),
      photoUrls: uploadedUrls,
    }

    try {
      const res = await fetch(
        `https://submit.formspark.io/f/${process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try calling or emailing us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="pb-24 bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="10 / Contact"
            label="Contact"
            title={<>Request a<br /><em>quote.</em></>}
            light
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
          <Reveal>
            <div className="flex flex-col gap-8 text-stone">
              {[
                { label: 'Call or Text', value: SITE_CONFIG.phone, href: SITE_CONFIG.phoneHref },
                { label: 'Email', value: SITE_CONFIG.email, href: SITE_CONFIG.emailHref },
              ].map(m => (
                <div key={m.label}>
                  <div className="text-[0.7rem] tracking-[0.2em] uppercase font-semibold mb-1.5">{m.label}</div>
                  <a href={m.href} className="text-white text-lg hover:text-stone transition-colors">{m.value}</a>
                </div>
              ))}
              <p className="text-sm font-light leading-relaxed max-w-[220px]">Most quotes go out the same day.</p>
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
                    <input name="name" type="text" required placeholder="Your full name" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Phone</span>
                    <input name="phone" type="tel" required placeholder="(541) 555-0123" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Email</span>
                  <input name="email" type="email" required placeholder="you@example.com" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Vehicle</span>
                    <input name="vehicle" type="text" required placeholder="2021 Toyota Tacoma" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Package</span>
                    <select name="package" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors">
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
                        <input type="checkbox" name="addons" value={addon.name} className="accent-white w-4 h-4" />
                        <span className="text-sm text-stone group-hover:text-white transition-colors">{addon.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Notes</span>
                  <textarea name="notes" rows={4} placeholder="Condition, preferred dates, location…" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-white outline-none transition-colors placeholder:text-graphite resize-none" />
                </label>

                {/* ── Vehicle Photos via UploadThing ── */}
                <div className="flex flex-col gap-3">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Photos</span>
                  <UploadButton
                    endpoint="vehiclePhotos"
                    onClientUploadComplete={(res) => {
                      setUploadedUrls(prev => [...prev, ...res.map(f => f.ufsUrl)])
                      setUploadError(null)
                    }}
                    onUploadError={(err) => {
                      setUploadError(`Upload failed: ${err.message}`)
                    }}
                    appearance={{
                      button: 'bg-charcoal border border-charcoal text-stone text-xs tracking-[0.12em] uppercase font-semibold px-5 py-2.5 hover:border-stone hover:text-white transition-colors rounded-none w-auto',
                      allowedContent: 'text-graphite text-xs mt-1',
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

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold bg-white text-ink hover:bg-stone hover:text-white transition-all duration-200 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send Request →'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
