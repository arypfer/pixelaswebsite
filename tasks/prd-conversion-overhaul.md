# PRD: Sales Conversion Overhaul

## Introduction

The Pixelas website showcases creative software tools (Photoshop plugins, AI tools, standalone apps) but suffers from high bounce rates and visitors leaving too quickly. This overhaul rethinks the entire purchase journey — from first impression to buy-button click — using trust signals, pricing psychology, mobile optimization, and improved UX. No existing testimonials or social proof assets are available, so all credibility must be built through design, content structure, and UX patterns.

## Goals

- Reduce bounce rate by making the first 5 seconds compelling (clear value prop, visual hook)
- Increase time-on-site through engaging content flow and product storytelling
- Improve click-through rate on buy buttons across all product pages
- Build trust and credibility without relying on existing testimonials
- Optimize the full journey: homepage → product page → external Mayar checkout
- Ensure mobile-first responsive experience across all conversion touchpoints

## User Stories

### US-001: Compelling Homepage Hero with Clear Value Proposition
**Description:** As a visitor, I want to immediately understand what Pixelas sells and why I should care, so I don't bounce within 5 seconds.

**Acceptance Criteria:**
- [ ] Hero section has a single clear headline communicating the core value (e.g., "Professional Creative Tools for Photographers & Designers")
- [ ] Subheadline addresses the target audience's pain point
- [ ] Primary CTA button ("Explore Products" or "See What's New") is visible above the fold
- [ ] Hero includes a visual preview of products in action (screenshot, mockup, or animation)
- [ ] Loads in under 2 seconds on mobile (no layout shift)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Social Proof & Credibility Section (No Testimonials Available)
**Description:** As a visitor, I want to see signals that this is a legitimate, trustworthy brand, so I feel confident buying.

**Acceptance Criteria:**
- [ ] "Why Pixelas" or credibility section on homepage with trust indicators
- [ ] Includes at least 3 trust signals: product count, update frequency, support availability, money-back guarantee, or "used by X creators" (even if approximate)
- [ ] Features recognizable platform logos if products integrate with known tools (Photoshop, Lightroom, etc.)
- [ ] Section is visually distinct with icons or illustrations
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Product Cards with Pricing Psychology
**Description:** As a visitor browsing products, I want to see pricing that feels like a good deal, so I'm motivated to click through.

**Acceptance Criteria:**
- [ ] Product cards show price prominently (not hidden)
- [ ] Promo prices display original price with strikethrough + discount percentage badge
- [ ] Cards include a micro-CTA ("View Details" or "Get It Now") instead of being purely passive
- [ ] Cards show 1-2 key benefit phrases (not just feature lists)
- [ ] Hover state reinforces interactivity
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Urgency & Scarcity Elements
**Description:** As a visitor on the fence, I want to feel a reason to buy now rather than later, so I don't procrastinate and forget.

**Acceptance Criteria:**
- [ ] Promo-priced products show a "Limited Time Offer" or "Sale" badge
- [ ] Optional: subtle banner or ribbon for active promotions on homepage
- [ ] Urgency copy is honest — no fake countdown timers or false scarcity
- [ ] Works with existing promo pricing fields in the Products collection
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Product Page — Above-the-Fold Conversion Zone
**Description:** As a visitor on a product page, I want to see the product name, key benefit, price, and buy button without scrolling, so I can make a quick decision.

**Acceptance Criteria:**
- [ ] Product name, one-line value proposition, price, and buy button all visible above the fold on desktop and mobile
- [ ] Buy button uses high-contrast color (amber/gold on dark) with action-oriented text ("Buy Now — Rp X" or "Get [Product Name]")
- [ ] Price includes promo treatment if applicable (strikethrough + savings callout)
- [ ] Cover image or product visual adjacent to the CTA zone
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Product Page — Feature Benefits Rewrite
**Description:** As a visitor, I want to understand how each feature helps me (not just what it is), so I see the value.

**Acceptance Criteria:**
- [ ] Features section uses benefit-oriented headings (e.g., "Save Hours of Editing" not just "Batch Processing")
- [ ] Each feature has icon + short title + 1-sentence benefit description
- [ ] Visual layout uses grid or alternating layout for scannability
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Product Page — Sticky Buy Button on Mobile
**Description:** As a mobile visitor scrolling through a product page, I want the buy button always accessible, so I can purchase the moment I'm convinced.

**Acceptance Criteria:**
- [ ] Sticky bottom bar appears on mobile when the main buy button scrolls out of view
- [ ] Bar shows product name (truncated), price, and "Buy Now" button
- [ ] Bar has subtle backdrop blur and doesn't obstruct content
- [ ] Bar hides when user scrolls back to the original CTA
- [ ] Only visible on screens < 768px
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Product Page — FAQ / Objection Handling Section
**Description:** As a hesitant buyer, I want common questions answered on the product page, so my doubts are resolved without needing to contact support.

**Acceptance Criteria:**
- [ ] FAQ accordion section near the bottom of product pages, above the final CTA
- [ ] Includes 4-6 generic questions applicable to all products (e.g., "How do I install?", "Is there a refund policy?", "Will this work with my version of Photoshop?", "Do I get free updates?")
- [ ] Expandable/collapsible with smooth animation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Product Page — Final CTA Section with Recap
**Description:** As a visitor who scrolled through the entire product page, I want one final push to buy, so the page ends with a clear action.

**Acceptance Criteria:**
- [ ] Bottom section repeats the core value proposition in a summary line
- [ ] Includes the buy button with price
- [ ] Optional: "Still not sure?" link to support/contact
- [ ] Visually distinct from the rest of the page (background treatment or card style)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Mobile-First Responsive Audit & Fix
**Description:** As a mobile visitor (likely 60%+ of traffic), I want every page to work flawlessly on my phone, so I don't abandon due to bad UX.

**Acceptance Criteria:**
- [ ] Homepage hero, product grid, and all sections render correctly on 375px width
- [ ] Product detail pages have no horizontal overflow or text truncation issues
- [ ] All touch targets (buttons, links) are at least 44px tall
- [ ] Images are properly sized (no giant images on mobile eating bandwidth)
- [ ] Navigation is accessible and easy to use on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Page Speed Optimization
**Description:** As a visitor on a slow connection, I want pages to load fast, so I don't leave before seeing the content.

**Acceptance Criteria:**
- [ ] Images use Next.js `<Image>` with proper `sizes` and `priority` attributes
- [ ] Above-the-fold images are prioritized; below-fold images are lazy-loaded
- [ ] No unnecessary client-side JavaScript blocking initial render
- [ ] Font loading doesn't cause layout shift (font-display: swap already configured)
- [ ] Typecheck passes

### US-012: Clear Navigation & Product Discovery
**Description:** As a visitor, I want to easily find and browse all products, so nothing is hidden or hard to reach.

**Acceptance Criteria:**
- [ ] Homepage has clear navigation to all product categories or a "View All Products" link
- [ ] Product count or category labels help visitors orient themselves
- [ ] Search/filter functionality is discoverable on homepage
- [ ] Breadcrumbs or back-navigation on product detail pages
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: Exit-Intent Email Capture (Optional Enhancement)
**Description:** As a business owner, I want to capture emails from visitors who are leaving, so I can nurture them into future customers.

**Acceptance Criteria:**
- [ ] Modal appears when cursor moves toward browser close/back (desktop only)
- [ ] Offers a compelling reason to subscribe (e.g., "Get 10% off your first purchase" or "Free preset pack")
- [ ] Simple form: email only, one CTA button
- [ ] Only triggers once per session (localStorage flag)
- [ ] Can be dismissed easily (X button + click outside)
- [ ] Respects user preference — doesn't re-trigger after dismissal
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Redesign homepage hero with value proposition, visual hook, and primary CTA above the fold
- FR-2: Add credibility/trust section to homepage with platform logos, trust indicators, and brand story elements
- FR-3: Enhance product cards with visible pricing, promo badges, discount percentages, and micro-CTAs
- FR-4: Add urgency indicators (badges, banners) for promo-priced products using existing collection fields
- FR-5: Restructure product page above-the-fold zone: product name, benefit line, price, and buy button all visible without scrolling
- FR-6: Rewrite product features section to lead with benefits, not just feature names
- FR-7: Implement sticky mobile buy button bar that appears when main CTA scrolls out of view
- FR-8: Add FAQ accordion section to product pages with common objection-handling questions
- FR-9: Add final CTA recap section at the bottom of product pages
- FR-10: Audit and fix all responsive issues on mobile (375px baseline)
- FR-11: Optimize image loading strategy (priority flags, lazy loading, proper sizing)
- FR-12: Improve navigation and product discovery (breadcrumbs, clear CTAs, visible search)
- FR-13: (Optional) Implement exit-intent email capture popup for desktop visitors

## Non-Goals

- No changes to Payload CMS admin panel or collection schemas (except minor field additions if needed)
- No payment processing changes — buy buttons continue linking to external Mayar URLs
- No user accounts, wishlists, or shopping cart functionality
- No A/B testing framework — changes are based on conversion best practices
- No blog, content marketing, or SEO-focused pages (separate initiative)
- No analytics implementation (assume Vercel Analytics or separate task)
- No changes to the standalone `/pxtouch` and `/canonstyle` landing pages (unless specifically requested later)

## Design Considerations

- Maintain existing dark luxury editorial aesthetic (#060606 bg, amber accent, noise texture)
- Reuse existing CSS utilities: `noise`, `ambient-glow`, `card-glow`, `shimmer-border`, `text-gradient`
- Use Lucide React icons consistently
- Fonts stay: Plus Jakarta Sans (body) + Instrument Serif (display)
- All new components should use Framer Motion for entrance animations consistent with existing patterns
- Mobile-first approach: design for 375px, then scale up
- Buy button color should be the highest-contrast element on every page (amber-500 on dark bg)

## Technical Considerations

- All product data comes from Payload CMS via local API — no new data sources needed
- Promo pricing fields already exist in Products collection (promoPrice, promoLabel)
- Buy button URLs come from `buyUrl` or `buyLinks` fields — wrapped with `ensureUrl()` helper
- Images served from Supabase S3 CDN — already optimized in previous session
- Sticky mobile bar needs `IntersectionObserver` to detect when main CTA leaves viewport
- FAQ content can be hardcoded initially, or added as a rich text / array field in Products collection later
- Exit-intent detection uses `mouseleave` event on `document.documentElement`
- ISR revalidation (60s) already configured — no caching changes needed

## Success Metrics

- Bounce rate reduction: visitors stay past the hero section (measurable via scroll depth)
- Buy button click-through rate increases (measurable via Mayar referral tracking)
- Mobile usability: zero horizontal scroll issues, all CTAs reachable with thumb
- Page load: Largest Contentful Paint < 2.5s on mobile
- Time on product pages increases (visitors read more before deciding)

## Open Questions

- Should FAQ content be hardcoded per-product or managed via Payload CMS?
- Is there a Mayar affiliate/referral tracking parameter we can add to buy URLs for analytics?
- What is the actual refund policy to display in FAQs?
- Should the email capture integrate with any specific email service (Mailchimp, etc.) or just collect to a Payload collection?
- Are there any product demo videos or before/after assets being created soon?
- What is the approximate user count or download count we can honestly display as social proof?
