<h1 align="center">📄✨ Toku – AI-Powered PDF Summarizer</h1>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/frontend-v0.dev-blueviolet?style=flat-square" />
  <img src="https://img.shields.io/badge/backend-Flask-000000?style=flat-square&logo=python" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
</p>

<p align="center">
  <b>Toku</b> is an AI-powered web app that reads PDFs, performs smart chunking based on chapters or sections,
  and summarizes them using advanced language models.
</p>

<hr />

## ✨ Features

- 📄 Upload any PDF file
- 📚 Smart chapter-based chunking
- 🧠 AI summarization per chapter
- 🖥️ Clean, responsive UI (powered by [v0.dev](https://v0.dev))
- 📥 Downloadable or shareable summaries (coming soon)

---

## 🖼️ Demo

> _Coming soon – stay tuned!_

---

## 🛠️ Tech Stack

### 🧩 Frontend
- [Next.js](https://nextjs.org/) (scaffolded using [v0.dev](https://v0.dev))
- [shadcn/ui](https://ui.shadcn.dev)
- TailwindCSS
- React.js

### 🔧 Backend
- Python + Flask
- PyMuPDF (PDF text extraction)
- OpenAI / Groq (AI summarization)
- REST API endpoints

---

## 📁 Folder Structure

```bash
toku/
├── backend/
│   ├── app.py
│   ├── pdf_reader.py
│   ├── chunker.py
│   ├── summarizer.py
│   └── routes/
├── frontend/
│   ├── src/
│   ├── pages/
│   └── components/
