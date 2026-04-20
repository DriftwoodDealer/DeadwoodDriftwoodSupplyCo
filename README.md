# DEADWOOD: Driftwood Supply Co.
### The Digital Atelier for Missouri River Relics

***

## 🪵 The Vision
DEADWOOD is a high-end driftwood supply company co-owned by **Mark Rosenthal** and **John Van Buren**. We specialize in sourcing masterpiece grade driftwood from the Missouri River and delivering it to the reptile, taxidermy, and luxury landscaping industries. 

This repository houses the full-stack e-commerce engine, the **"See It In Your Tank"** 3D composition tool, and the automated asset pipeline that converts raw river finds into photorealistic digital twins.

***

## 🛠 The Tech Stack: "Smokey Glass & High Performance"
We’ve built this using a visceral luxury tech aesthetic—obsidian tones, heavy blurs, and high-contrast visuals that make the natural wood grain pop.

### 1. The Frontend (The Glass)
* **Next.js & React:** Powering a lightning-fast, SEO-optimized storefront.
* **Three.js + React Three Fiber (R3F):** The engine behind the interactive 3D builder.
* **Tailwind CSS + Framer Motion:** Creating the "Smokey Glassmorphism" effects and smooth UI transitions.
* **Radix UI:** Ensuring professional-grade accessibility for the Contractor Dashboard.

### 2. The 3D & AI Pipeline (The Soul)
* **Gaussian Splatting (Luma AI / Polycam):** Capturing microscopic cracks and silt-weathered grains in photorealistic 3D.
* **WebGPU Shaders:** Handling real-time shadows and depth-of-field without lagging the browser.
* **Tripo AI / Rodin API:** Automating the conversion of field photography into clean 3D assets.

### 3. The Backend (The Grit)
* **Supabase / PostgreSQL:** Managing Visual Provenance data, GPS coordinates, and B2B tiers.
* **Cloudinary:** Delivering 4K "Money Shot" videos and macro-photography at scale.

***

## 🌊 The Workflow: From River to Render
Our pipeline is designed for speed, taking a piece of wood from the mud to the digital shop in record time.

1. **The Harvest**
Identifying unique pieces on the Missouri River banks during the hunt.

2. **The Scan**
Capturing the geometry using 360-degree photography or LiDAR in the field.

3. **The Sanitization**
Documenting the **Bio-Sanctity Protocol** involving 250°F heat-treats for customer trust.

4. **The Automation**
Python scripts trigger AI APIs to clean the scan and generate the `.splat` and `.glb` files.

5. **The Drop**
The piece goes live in the **"See It In Your Tank"** tool with its own digital "Birth Certificate."

***

## 💎 Key Features

### The "See It In Your Tank" Builder
A digital composition engine where users select their enclosure dimensions (Exo Terra, Zoo Med, etc.) and virtually hardscape using our 3D library. 
* **AI Environment Toggle:** Instantly swap lighting from "Jungle Mist" to "High-Desert Sun."
* **Spec-Check Validation:** Automatically flags if a piece is too large for the selected enclosure.

### The Contractor Portal
A dedicated dashboard for professional taxidermists and shop owners to manage bi-monthly truckload contracts. 
* **40% Wholesale Tier:** Automated discount management for verified partners.
* **Commissioned Hunts:** A portal for pros to upload sketches of specific shapes they need for custom projects.

### The Provenance Vault
Every Masterpiece piece comes with a QR-coded copper tag linking back to this site.
* **GPS Geotagging:** Show the exact riverbend where the wood was harvested.
* **Field Notes:** Access raw video content of the river adventures and the story of the find.

***

## 🧼 The Bio-Sanctity Protocol
Trust is the biggest hurdle for high-end wood. We document every step.

* **Thermal Hardening:** Kiln-baked at 250°F to ensure zero parasites or bacteria.
* **Sonic Scrubbing:** High-pressure removal of Missouri river silt without damaging the patina.
* **Moisture Testing:** Professional-grade hygrometer checks to ensure the wood won't warp or mold.

***

## 📂 Repository Structure

| Directory | Description |
| :--- | :--- |
| `/components/three` | R3F components for the 3D Tank Builder |
| `/components/ui` | Tailwind + Radix smokey glass components |
| `/lib/api` | Luma AI and Tripo AI integration logic |
| `/scripts/pipeline` | Python scripts for automated scan-to-model processing |
| `/public/assets` | Optimized 3D assets and 4K macro photography |

***

## 🤝 Business & Legal
* **Owners:** Mark Rosenthal & John Van Buren
* **Location:** Cape Girardeau, Missouri
* **Inquiries:** Reach out via the Contractor Portal for wholesale opportunities.

***

## 🚀 Getting Started

```bash
# Clone the atelier
git clone [https://github.com/deadwood/deadwood-supply.git](https://github.com/deadwood/deadwood-supply.git)

# Install the engine
npm install

# Configure environment variables
cp .env.example .env.local

# Fire up the river
npm run dev
