# WhatsApp Template: skys_recruitment_confirmation_v1

## Template Details
- **Name:** skys_recruitment_confirmation_v1
- **Category:** UTILITY
- **Language:** English (en)
- **Type:** Interactive (CTA Button)

## Message Body (exact — submit this to Meta)

```
Hi {{1}}, your eligibility for a 4X Transition Package has been successfully received.

Here's what happens next:
1. Our team will review your profile within 1 business day
2. A senior leader will reach out to understand your current structure and goals
3. We'll walk you through a tailored transition plan based on your experience

👇 Tap below to secure a quick discussion slot:
```

## Footer
```
SKYS Branch · Manulife Financial Advisers Singapore
```

## Button
- **Type:** URL (Call to Action)
- **Label:** Confirm My Slot
- **URL:** {{2}}

---

## Variables
- `{{1}}` = Lead's first name (e.g. "Sam")
- `{{2}}` = Sam's booking URL (e.g. https://calendly.com/samuel-seah/discussion)

---

## How to Submit via Twilio Console
1. Go to: Messaging → Content Template Builder → Create New
2. Name: `skys_recruitment_confirmation_v1`
3. Category: Utility
4. Body: paste above
5. Footer: SKYS Branch · Manulife Financial Advisers Singapore
6. Add Button → Call to Action → Visit Website → Label: "Confirm My Slot" → URL: {{2}} (dynamic)
7. Submit for approval → typically approved in 24–48h

## Env Vars Needed in Vercel
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WA_FROM=whatsapp:+6591086574
TWILIO_CONTENT_SID=HXe0edfbbcddd857cb8fe1fb4fe5b05d51
BOOKING_URL=https://calendly.com/samuel-seah/discussion  ← Sam's link
```
