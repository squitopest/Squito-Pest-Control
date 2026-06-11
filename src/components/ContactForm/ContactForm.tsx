"use client";

import { useId, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, CheckCircle, Map, Home, Building2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

type ContactFormProps = {
  teamPhoto?: string;
};

export default function ContactForm({
  teamPhoto = COMPANY_PHOTOS.contact,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const prefilledType = searchParams.get("type");
  const prefilledService = searchParams.get("service");
  const prefilledMessage = searchParams.get("message");
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<"residential" | "commercial">("residential");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const autocompleteAbortRef = useRef<AbortController | null>(null);
  const reactId = useId();
  const formPanelId = `contact-form-panel-${reactId}`;
  const suggestionListId = `contact-address-suggestions-${reactId}`;
  const suggestionOptionId = (i: number) => `contact-address-option-${reactId}-${i}`;

  // Handle clicking outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to form top on submission success
  useEffect(() => {
    if (submitted) {
      // Small timeout to allow React to render the success state
      setTimeout(() => {
        const successEl = document.getElementById("success-message");
        if (successEl) {
          window.scrollTo({
            top: successEl.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  }, [submitted]);

  useEffect(() => {
    if (prefilledType === "residential" || prefilledType === "commercial") {
      setType(prefilledType);
    }

    if (prefilledService || prefilledMessage) {
      setForm((prev) => ({
        ...prev,
        service: prefilledService || prev.service,
        message: prefilledMessage || prev.message,
      }));
    }
  }, [prefilledMessage, prefilledService, prefilledType]);

  const [isCurrentCustomer, setIsCurrentCustomer] = useState<"yes" | "no" | "">("");
  const [agreeToContact, setAgreeToContact] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    message: "",
    service: "Free Inspection Request",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Maps Predictive Autocomplete.
  // Mirrors the hardened implementation on /book: aborts stale in-flight
  // requests so late responses can't overwrite newer input, tracks a
  // dedicated loading flag for a spinner, and resets the keyboard highlight.
  const handleAddressChange = async (val: string) => {
    setForm(prev => ({ ...prev, street: val }));
    setHighlightedIndex(-1);

    if (val.length < 3) {
      autocompleteAbortRef.current?.abort();
      setSuggestions([]);
      setShowSuggestions(false);
      setAutocompleteLoading(false);
      return;
    }

    autocompleteAbortRef.current?.abort();
    const controller = new AbortController();
    autocompleteAbortRef.current = controller;
    setAutocompleteLoading(true);

    try {
      const res = await fetch(`/api/maps/autocomplete?input=${encodeURIComponent(val)}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      if (data.status === "OK" && data.predictions) {
        setSuggestions(data.predictions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        console.error("Autocomplete Error", e);
      }
    } finally {
      if (autocompleteAbortRef.current === controller) {
        setAutocompleteLoading(false);
      }
    }
  };

  const selectSuggestion = useCallback(async (suggestion: any) => {
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    setForm(prev => ({ ...prev, street: suggestion.description }));

    try {
      const res = await fetch(`/api/maps/details?place_id=${encodeURIComponent(suggestion.place_id)}`);
      const data = await res.json();
      if (data.street) {
        setForm(prev => ({
          ...prev,
          street: data.street || suggestion.description,
          city: data.city || "",
          zip: data.zipCode || ""
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setShowSuggestions(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        selectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !agreeToContact) return;

    setLoading(true);
    setError(null);

    const customerNote =
      isCurrentCustomer === "yes"
        ? "Current customer: Yes"
        : isCurrentCustomer === "no"
          ? "Current customer: No"
          : "";
    const fullMessage = [customerNote, form.message].filter(Boolean).join("\n\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: fullMessage, type }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      setSubmitted(true);
      trackMetaEvent("Lead", {
        content_name: form.service,
        content_category: type,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]" id="contact">
      {teamPhoto && (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 z-0 w-[38vw] max-w-[520px] min-h-full">
          <Image
            src={teamPhoto}
            alt=""
            fill
            sizes="38vw"
            className="object-cover"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent pointer-events-none"
            aria-hidden
          />
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
          <div className="on-photo flex-1 max-w-lg animate-fade-in-up space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
              Get Your{" "}
              <span className="gradient-text">Free Inspection</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Fill out the form and a specialist will call you within the hour.
              Same-day service available.
            </p>

            <div className="flex flex-col gap-5">
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-4 w-fit px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/10">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors shrink-0">
                  <Phone size={18} className="text-green-500" />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-0.5">Call Us</div>
                  <div className="text-lg font-display font-bold text-white group-hover:text-green-400 transition-colors">(631) 203-1000</div>
                </div>
              </a>
              <a href="mailto:service@getsquito.com" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all">
                  <Mail size={20} className="text-green-500" />
             </div>
                <div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">Email Us</div>
                  <div className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">service@getsquito.com</div>
                </div>
             </a>
              <div className="flex items-center gap-4 w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">Service Area</div>
                 <div className="text-lg font-semibold text-white">Nassau & Suffolk County</div>
               </div>
             </div>
           </div>

            <div className="space-y-3">
              {["Free inspection, no obligation", "We call within the hour", "Same-day service available"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/80 leading-relaxed">
                  <CheckCircle size={18} className="text-green-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="w-full min-w-0">
           {submitted ? (
            <div className="glass-card rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(34,197,94,0.1)] border-green-500/20">
                <div id="success-message" className="text-center py-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                 </div>
                 <h3 className="text-3xl font-display font-bold text-white mb-3">We&apos;ll be in touch shortly!</h3>
                 <p className="text-white/70 mb-6 max-w-sm mx-auto text-sm">
                   Thanks for reaching out. A Squito specialist will contact you within the hour to schedule your free inspection.
                 </p>
                 <a href="tel:6312031000" className="group relative inline-flex items-center gap-3 mb-8 px-7 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                    <div className="relative z-10 w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                      <Phone size={18} className="text-green-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative z-10 flex flex-col items-start">
                      <span className="text-[9px] uppercase tracking-widest text-green-500/70 font-semibold leading-none mb-0.5">Faster Service</span>
                      <span className="text-lg font-display font-bold text-white">(631) 203-1000</span>
                    </div>
                 </a>

               </div>
            </div>
            ) : (
              <div
                id={formPanelId}
                role="region"
                aria-label="Free inspection form"
                className="glass-card rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(34,197,94,0.1)] border-green-500/20"
              >
                <div className="mb-8 pb-6 border-b border-white/10">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
                    Let&apos;s talk about your pest problems.
                  </h3>
                  <p className="text-white/70 text-sm md:text-base">
                    Send us a message using the form below, or call us at{" "}
                    <a href="tel:6312031000" className="font-semibold text-green-400 hover:text-green-300">
                      (631) 203-1000
                    </a>
                    .
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <fieldset>
                    <legend className="text-sm font-semibold text-white/90 mb-3">
                      What type of property do you need help with?
                    </legend>
                    <div className="flex flex-wrap gap-4">
                      {(
                        [
                          { value: "residential" as const, label: "Residential", icon: Home },
                          { value: "commercial" as const, label: "Commercial", icon: Building2 },
                        ] as const
                      ).map(({ value, label, icon: Icon }) => (
                        <label
                          key={value}
                          className={`inline-flex items-center gap-2 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            type === value
                              ? "border-green-500 bg-green-500/15 text-white"
                              : "border-white/20 text-white/70 hover:border-white/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="property-type"
                            value={value}
                            checked={type === value}
                            onChange={() => setType(value)}
                            className="sr-only"
                          />
                          <Icon size={15} aria-hidden />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold text-white/90 mb-3">
                      Are you a current customer?
                    </legend>
                    <div className="flex flex-wrap gap-4">
                      {(["yes", "no"] as const).map((value) => (
                        <label
                          key={value}
                          className={`inline-flex items-center gap-2 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            isCurrentCustomer === value
                              ? "border-green-500 bg-green-500/15 text-white"
                              : "border-white/20 text-white/70 hover:border-white/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="current-customer"
                            value={value}
                            checked={isCurrentCustomer === value}
                            onChange={() => setIsCurrentCustomer(value)}
                            className="sr-only"
                          />
                          {value === "yes" ? "Yes" : "No"}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-white/90">
                      How can we help you?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us what you're seeing and where..."
                      className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors resize-none"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                     <label htmlFor="firstName" className="text-sm font-semibold text-white/80 ml-1">First Name *</label>
                      <input
                       id="firstName"
                       ref={firstNameRef}
                       type="text"
                        required
                        autoComplete="given-name"
                        placeholder="John"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.firstName}
                       onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      />
                   </div>
                    <div className="space-y-2">
                     <label htmlFor="lastName" className="text-sm font-semibold text-white/80 ml-1">Last Name *</label>
                      <input
                       id="lastName"
                     type="text"
                        required
                       autoComplete="family-name"
                       placeholder="Smith"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                       value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-white/90">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="john@example.com"
                      className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-white/90">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="(631) 555-0000"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="zip" className="text-sm font-semibold text-white/90">ZIP Code *</label>
                      <input
                        id="zip"
                        type="text"
                        required
                        placeholder="11749"
                        maxLength={5}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.zip}
                        onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative" ref={suggestionsRef}>
                      <label htmlFor="street" className="text-sm font-semibold text-white/90">Street Address (optional)</label>
                      <input
                        id="street"
                        type="text"
                        autoComplete="street-address"
                        placeholder="123 Main St"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.street}
                        onChange={e => handleAddressChange(e.target.value)}
                        onKeyDown={handleAddressKeyDown}
                        onFocus={() => {
                          if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={showSuggestions && suggestions.length > 0}
                        aria-controls={suggestionListId}
                        aria-activedescendant={
                          highlightedIndex >= 0 ? suggestionOptionId(highlightedIndex) : undefined
                        }
                      />
                      {autocompleteLoading && (
                        <p className="mt-2 text-xs text-white/40 flex items-center gap-2">
                          <Loader2 size={12} className="animate-spin" aria-hidden="true" /> Looking up addresses…
                        </p>
                      )}

                      {/* Google Maps Interactive Dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <ul
                          id={suggestionListId}
                          role="listbox"
                          aria-label="Matching addresses"
                          className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                        >
                          {suggestions.map((suggestion, i) => {
                            const highlighted = i === highlightedIndex;
                            return (
                              <li
                                key={suggestion.place_id ?? i}
                                id={suggestionOptionId(i)}
                                role="option"
                                aria-selected={highlighted}
                                onMouseEnter={() => setHighlightedIndex(i)}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  selectSuggestion(suggestion);
                                }}
                                className={`px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-colors flex items-center gap-3 ${
                                  highlighted ? "bg-white/10" : "hover:bg-white/5"
                                }`}
                              >
                                <Map size={16} className="text-white/40 flex-shrink-0" aria-hidden="true" />
                                <div>
                                  <p className="text-sm font-semibold text-white/90">{suggestion.structured_formatting?.main_text || suggestion.description}</p>
                                  <p className="text-xs text-white/50">{suggestion.structured_formatting?.secondary_text || ""}</p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToContact}
                      onChange={(e) => setAgreeToContact(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/30 bg-background/50 text-green-500 focus:ring-green-500/50"
                      required
                    />
                    <span className="text-xs text-white/60 leading-relaxed">
                      I agree to be contacted by Squito about my request. We never share your data.
                    </span>
                  </label>

                 <button
                   type="submit"
                   disabled={loading || !agreeToContact}
                   aria-disabled={loading || !agreeToContact}
                   aria-busy={loading}
                   className="gradient-cta w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <Send size={18} aria-hidden />
                   {loading ? "Sending..." : "Send Message"}
                 </button>
                 
                 {error && (
                   <p className="text-sm font-semibold text-red-400 text-center mt-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                     {error}
                   </p>
                 )}
              </form>
            </div>
             )}
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}
